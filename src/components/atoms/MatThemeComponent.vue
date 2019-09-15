<script>
import { Component, Vue } from 'vue-property-decorator';
import theme from '@materiajs/theme';

@Component({
  props: {
    initTheme: {
      type: Function,
      default: props => ({
        '--color': props.color ? `var(--${props.color})` : undefined,
        '--text-color': props.color
          ? theme.computeTextColor(
            document.documentElement.style.getPropertyValue(props.color),
            true,
          )
          : undefined,
        '--round': props.round ? `${props.round}px` : undefined,
      }),
    },
  },
})
export default class MatThemeComponent extends Vue {
}
</script>
