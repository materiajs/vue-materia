import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
    const { value } = binding;
    el.style.setProperty('--color', `var(--${value})`);
  },
  update(el, binding) {
    const { value } = binding;
    el.style.setProperty('--color', `var(--${value})`);
  },
};

export default directive;
