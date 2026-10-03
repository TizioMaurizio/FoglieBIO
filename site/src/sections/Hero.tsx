import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Bottle } from "../components/Primitives";
import { OrganicHighlight } from './Organic';
import { brand } from '../data/content';
import { brandAssets } from '../data/brandAssets';
export function Hero() {
  return (
    <section className="hero" id="inizio">
      <div className="hero-copy">
        <p className="eyebrow">
          FOGLIE D’OLIVO ITALIANE. UNA NUOVA PROSPETTIVA.
        </p>
        <h1>
          <span className="word-mask">
            <span>Dalla terra.</span>
          </span>
          <span className="word-mask">
            <span>Dalle foglie.</span>
          </span>
          <span className="word-mask accent">
            <span>Una storia vera.</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <a className="button" href="#prodotto">
            Scopri Foglie Bio Plus <ArrowUpRight size={19} />
          </a>
          <p>
            L’infuso di foglie d’olivo nato dalla passione di Antonio e da anni
            di studio.
          </p>
        </div>
        <OrganicHighlight />
      </div>
      <div className="hero-art">
        <img className="hero-brand-branch" src={brandAssets.branch} width="500" height="500" alt="" aria-hidden="true" />
        <p className="art-note">
          Olea europaea
          <br />
          <span>Dalle foglie, tutto ha inizio.</span>
        </p>
        <div className="bottle-stage"><Bottle priority /></div>
        <span className="vertical-note">ORIGINE DELLE FOGLIE · ITALIA</span>
      </div>
      <div className="hero-foot">
        <span>FOGLIE BIO PLUS® · UN’IDEA ITALIANA, DAL {brand.foundedYear}</span>
        <a href="#foglie">
          Un’altra prospettiva sull’olivo <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
