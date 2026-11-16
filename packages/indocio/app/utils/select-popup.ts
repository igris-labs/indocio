interface SelectPopupSpace {
  above: number
  below: number
  preferred: 'top' | 'bottom'
  scrollHeight: number
  chrome: number
  maxHeight: number
}

export function fitSelectPopup(space: SelectPopupSpace) {
  const desired = Math.min(space.maxHeight, space.scrollHeight) + space.chrome
  const side =
    space.preferred === 'top'
      ? space.above >= desired || space.above >= space.below
        ? 'top'
        : 'bottom'
      : space.below >= desired || space.below >= space.above
        ? 'bottom'
        : 'top'
  return {
    side,
    height: Math.max(
      0,
      Math.floor(
        Math.min(space.maxHeight, (side === 'top' ? space.above : space.below) - space.chrome),
      ),
    ),
  } as const
}
