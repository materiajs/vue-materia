<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import theme from '@materiajs/theme';

@Component({
  props: {
    initTheme: {
      type: Function,
      default: (props, setDefaults = true) => {
        const isHash = props.color && props.color.includes('#');
        const isGradientHash = props.gradient && props.gradient.includes('#');
        const primaryColor = isHash ? props.color : `var(--${props.color})`;
        const gradientColor = isGradientHash ? props.gradient : `var(--${props.gradient})`;
        return {
          // eslint-disable-next-line
          '--color': primaryColor || undefined,
          '--gradient-color': gradientColor,
          '--gradient-direction': props.gradientDirection || undefined,
          '--text-color': props.color
            ? theme.computeTextColor(
              isHash ? props.color : document.documentElement.style.getPropertyValue(`--${props.color}`),
              true,
            )
            : undefined,
          '--round': props.round ? `${parseInt(props.round, 10) * 5}px` : undefined,
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
        };
      },
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
