import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
  bind(el, binding) {
    if (binding.value) {
      el.style['border-radius'] = `${binding.value}px`;
    }
  },
};

export default directive;
