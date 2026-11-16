import { cloneVNode, defineComponent } from 'vue'
import type { PropType, VNode } from 'vue'

// Keep the render component stable and leave the author's slot VNode unmounted.
export default defineComponent({
  props: { node: { type: Object as PropType<VNode>, required: true } },
  setup: (props) => () => cloneVNode(props.node),
})
