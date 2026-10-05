# Read-only verification using Stripe CLI's normal saved authentication.
$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot '../src/config/stripe-test.json') -Raw | ConvertFrom-Json
function Read-Stripe {
  param([string[]]$Arguments)
  $raw = & stripe @Arguments
  if ($LASTEXITCODE -ne 0) { throw 'Stripe API read failed.' }
  $value = $raw | ConvertFrom-Json
  if ($value.error) { throw $value.error.message }
  return $value
}
function Assert-Test { param([bool]$Condition,[string]$Message); if (-not $Condition) { throw $Message } }
$account = Read-Stripe -Arguments @('get','/v1/account')
Assert-Test ($account.id -eq $manifest.accountId) 'Select the correct La Ruota Bio sandbox.'
Assert-Test (($manifest.offers.bottles -join ',') -eq '1,3') 'Expected the single/triple offers.'
Assert-Test ($manifest.baseUnitAmountCents -eq 4250 -and $manifest.offers[1].amountCents -eq 11730 -and $manifest.offers[1].discountPercent -eq 8) 'Antonio pricing mismatch.'
$euCountries = @('AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','CH')
$expectedCountries = ($euCountries | Sort-Object) -join ','
Assert-Test ((($manifest.allowedShippingCountries | Sort-Object) -join ',') -eq $expectedCountries) 'Expected EU27 plus Switzerland.'
foreach($locale in @('it','en')) {
  $rate = Read-Stripe -Arguments @('shipping_rates','retrieve',$manifest.shippingRateIds.$locale)
  Assert-Test ($rate.livemode -eq $false -and $rate.active -and $rate.fixed_amount.amount -eq $manifest.shippingAmountCents -and $rate.fixed_amount.currency -eq 'eur') 'Incorrect test shipping rate.'
}
foreach($offer in $manifest.offers) {
  $product = Read-Stripe -Arguments @('products','retrieve',$offer.productId)
  Assert-Test ($product.livemode -eq $false -and $product.active -and $product.shippable -and $product.name.StartsWith('TEST')) 'Expected active shippable test pack.'
  $price = Read-Stripe -Arguments @('prices','retrieve',$offer.priceId)
  Assert-Test ($price.livemode -eq $false -and $price.active -and $price.product -eq $offer.productId -and $price.unit_amount -eq $offer.amountCents -and $price.currency -eq 'eur' -and $price.type -eq 'one_time') 'Incorrect test pack price.'
  Assert-Test ($offer.amountCents -eq [Math]::Round($manifest.baseUnitAmountCents * $offer.bottles * (100-$offer.discountPercent)/100)) 'Incorrect proposed discount.'
  foreach($locale in @('it','en')) {
    $expected = $offer.links.$locale
    $link = Read-Stripe -Arguments @('payment_links','retrieve',$expected.id,'--expand','line_items')
    $item = $link.line_items.data[0]
    Assert-Test ($link.livemode -eq $false -and $link.active -and $link.url -eq $expected.url -and $link.url.StartsWith('https://buy.stripe.com/test_')) 'Incorrect or inactive test link.'
    Assert-Test ($link.line_items.data.Count -eq 1 -and $item.quantity -eq 1 -and $item.price.id -eq $offer.priceId -and -not $item.adjustable_quantity.enabled) 'The fixed pack can be changed or has the wrong price.'
    Assert-Test ((($link.shipping_address_collection.allowed_countries | Sort-Object) -join ',') -eq $expectedCountries) 'Incorrect EU27 + Switzerland address collection.'
    Assert-Test ($link.shipping_options.Count -eq 1 -and $link.shipping_options[0].shipping_rate -eq $manifest.shippingRateIds.$locale) 'Incorrect localized test shipping.'
    Assert-Test (($link.payment_method_types -join ',') -eq 'card,satispay') 'Unexpected payment methods.'
    Assert-Test ($link.phone_number_collection.enabled -and $link.billing_address_collection -eq 'auto') 'Incorrect customer collection.'
    Assert-Test (-not $link.automatic_tax.enabled -and -not $link.invoice_creation.enabled -and -not $link.allow_promotion_codes) 'Unexpected tax, invoices or coupon stacking.'
    Assert-Test ($link.metadata.language -eq $locale -and $link.metadata.approval_status -eq 'antonio_pricing_preview') 'Missing language/pricing metadata.'
    Assert-Test ($link.after_completion.type -eq 'hosted_confirmation' -and $link.after_completion.hosted_confirmation.custom_message.StartsWith('TEST')) 'Missing hosted TEST confirmation.'
    Write-Output "PASS $($offer.bottles) bottles / $locale / EU27 + CH / fixed pack / $($offer.amountCents) cents."
  }
}
$configurations = Read-Stripe -Arguments @('payment_method_configurations','list','--limit','100')
$config = $configurations.data | Where-Object { $_.is_default -and $_.active -and $_.livemode -eq $false }
foreach($method in @('card','apple_pay','google_pay','satispay')) { Assert-Test ($config.$method.available -and $config.$method.display_preference.value -eq 'on') ("Method unavailable: "+$method) }
Write-Output 'Verified 4 bilingual EU27 + Switzerland sandbox links. No resources changed.'
