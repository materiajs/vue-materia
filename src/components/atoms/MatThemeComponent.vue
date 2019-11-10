<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import theme from '@materiajs/theme';

@Component({
  props: {
    initTheme: {
      type: Function,
      default: (props, setDefaults = true) => ({
        '--color': props.color ? `var(--${props.color})` : undefined,
        '--gradient-color': props.gradient ? `var(--${props.gradient})` : undefined,
        '--gradient-direction': props.gradientDirection || undefined,
        '--text-color': props.color
          ? theme.computeTextColor(
            document.documentElement.style.getPropertyValue(`--${props.color}`),
            true,
          )
          : undefined,
        '--round': props.round ? `${parseInt(props.round, 10) * 3}px` : undefined,
        padding: props.padding,
        margin: props.margin,
        display: props.display,
        cursor: props.cursor,
        height: props.height,
        width: props.width,
        'max-width': props.maxWidth,
        'z-index': props.zIndex,
        ...(setDefaults ? {
          background: props.color ? `linear-gradient(
              var(--gradient-direction, to bottom),
              var(--color),
              ${props.gradient ? 'var(--gradient-color)' : 'var(--color)'}
            )` : undefined,
          color: 'var(--text-color, var(--default-text))',
        } : {}),
      }),
    },
  },
})
export default class MatThemeComponent extends Vue {
  @Prop({ type: String })
  color;

  @Prop({ type: String })
  gradient;

  @Prop({ type: String })
  gradientDirection;

  @Prop({ type: String })
  height;

  @Prop({ type: String })
  width;

  @Prop({
    // xs
    // sm
    // md
    // lg
    // xl
    type: String,
  })
  size;
}
</script>
