const margin = { top: 0, right: '10%', bottom: '10%', left: '10%' };

export const styles = {
  root: {
    fontFamily: 'consolas, sans-serif',
    textAlign: 'center',
    position: 'relative',
    width: 600,
    height: 600,
  },
  overlay: {
    position: 'absolute',
    top: margin.top,
    right: margin.right,
    bottom: margin.bottom,
    left: margin.left,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '7vw',
    color: 'black',
    // background: "#FFFFFF33",
    textAlign: 'center',
    // This is important to preserve the chart interactivity
    pointerEvents: 'none',
  },
  percentLabel: {
    fontSize: '.5em',
  },
};
