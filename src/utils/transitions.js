const setup = styles => (el) => {
  if (styles) {
    Object.keys(styles)
      .forEach((attr) => {
          el.style[attr] = styles[attr]; // eslint-disable-line
      });
  }
};

const setVelocity = styles => (el, done) => {
  if (styles) {
    Velocity(el, styles, {
      complete: done,
      duration: 200,
      easing: [700, 50],
    });
  }
};

export default {
  setup,
  setVelocity,
  'fade-in-out': () => ({
    beforeEnter: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: [0, 1] },
  }),
  explode: {
    beforeEnter: setup({ 'transform-origin': 'top left' }),
    enter: setVelocity({ opacity: [1, 0], scale: [1, 0.5] }),
    beforeLeave: setup({ 'transform-origin': 'top left' }),
    leave: setVelocity({ opacity: [0, 1], scale: 0.5 }),
  },
  down: {
    beforeEnter: setup({ 'transform-origin': 'top' }),
    enter: setVelocity({ opacity: [1, 0], scaleY: [1, 0.5] }),
    beforeLeave: setup({ 'transform-origin': 'top' }),
    leave: setVelocity({ opacity: [0, 1], scaleY: 0.5 }),
  },
  downUp: {
    beforeEnter: setup({ opacity: 0 }),
    enter: setVelocity({ opacity: 1, translateY: [0, '-15px'] }),
    leave: setVelocity({ opacity: [0, 1], translateY: ['-15px', 0] }),
  },
  left: {
    beforeEnter: setup({ width: '0' }),
    enter: setVelocity({ opacity: [1, 0], scaleY: [1, 0.5] }),
    beforeLeave: setup({ 'transform-origin': 'top' }),
    leave: setVelocity({ opacity: [0, 1], scaleY: 0.5 }),
  },
  'explode-left': () => ({
    beforeEnter: { 'transform-origin': 'top right' },
    enter: { opacity: 1, scale: [1, 0.2] },
    beforeLeave: { 'transform-origin': 'top right' },
    leave: { opacity: [0, 1], scale: 0.2 },
  }),
  // 'up-down': () => ({
  //   beforeEnter: { opacity: 0 },
  //   enter: { opacity: 1, translateY: [0, '25px'] },
  //   leave: { opacity: [0, 1], translateY: ['25px', 0] },
  // }),
  // 'move-left': () => ({
  //   beforeEnter: { opacity: 0 },
  //   enter: { opacity: 1, translateX: [0, '25px'] },
  //   leave: { opacity: [0, 1], translateX: ['-25px', 0] },
  // }),
  // 'move-right': () => ({
  //   beforeEnter: { opacity: 0 },
  //   enter: { opacity: 1, translateX: [0, '-25px'] },
  //   leave: { opacity: [0, 1], translateX: ['25px', 0] },
  // }),
  // 'expand-collapse': el => ({
  //   beforeEnter: { opacity: 0, overflow: 'hidden' },
  //   enter: { 'max-height': [`${el.clientHeight}px`, 0], opacity: 1 },
  //   beforeLeave: { 'max-height': `${el.clientHeight}px`, overflow: 'hidden' },
  //   leave: { opacity: [0, 1], 'max-height': 0 },
  // }),
  // 'slide-in-out-left': () => ({
  //   beforeEnter: { width: '100%', top: 0 },
  //   enter: { translateX: [0, '-100%'] },
  //   beforeLeave: { position: 'absolute', top: 0, width: '100%' },
  //   leave: { translateX: ['-100%', 0] },
  // }),
  // 'slide-in-out-right': () => ({
  //   beforeEnter: { width: '100%', top: 0 },
  //   enter: { translateX: [0, '100%'] },
  //   beforeLeave: { position: 'absolute', top: 0, width: '100%' },
  //   leave: { translateX: ['100%', 0] },
  // }),
  // 'slide-up-down': () => ({
  //   enter: { translateY: [0, '100%'] },
  //   leave: { translateY: ['100%', 0] },
  // }),
};
