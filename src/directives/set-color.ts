import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
    if (binding.value) {
      el.style.setProperty('--color', `var(--${binding.value})`);
    }
  },
  update(el, binding) {
    if (binding.value) {
      el.style.setProperty('--color', `var(--${binding.value})`);
    }
  },
};

export default directive;
