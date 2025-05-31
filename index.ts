import { registerRootComponent } from 'expo';
import App from './src/App';

declare global {
  interface SVGElement {
    transformOrigin: string;
  }
}

if (typeof SVGElement.prototype.transformOrigin === 'undefined') {
  Object.defineProperty(SVGElement.prototype, 'transformOrigin', {
    get() {
      return this.getAttribute('transform-origin') || '0 0';
    },
    set(value: string) {
      this.setAttribute('transform-origin', value);
    },
  });
}

registerRootComponent(App);