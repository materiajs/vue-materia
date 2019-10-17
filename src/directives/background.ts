import { DirectiveOptions } from 'vue';

const getValue = (s: string) => (s && s.includes('#') ? s : `var(--${s})`);

function setValue(el: HTMLElement, binding: {[value: string]: any}) {
  if (binding.value) {
    el.style['background-image'] = `linear-gradient(${binding.arg ? `${binding.arg},` : ''} ${getValue(binding.value[0])}, ${getValue(binding.value[1] || binding.value[0])})`;
    el.style.color = `var(--${binding.value[0]}-text)`;
  }
}

const directive: DirectiveOptions = {
  bind: setValue,
  update: setValue,
};

export default directive;
