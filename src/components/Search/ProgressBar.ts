import {
  computed,
  defineComponent,
  h,
} from '@vue/runtime-core'
import chalk from 'chalk'
import type { PropType } from '@vue/runtime-core'

const FIGURES = {
  basic: '█',
  shade: '▓',
} as const

type FigureType = keyof typeof FIGURES

export const ProgressBar = defineComponent({
  name: 'TuiProgressBar',

  props: {
    color: {
      required: false,
      default: 'blue',
      type: String,
    },
    bgColor: {
      required: false,
      default: 'white',
      type: String,
    },
    width: {
      required: false,
      default: 25,
      type: Number,
    },
    value: {
      required: true,
      type: Number,
    },
    type: {
      required: false,
      type: String as PropType<FigureType>,
      default: 'basic',
    },
  },

  setup(props) {
    const content = computed(() => {
      const type = FIGURES[props.type]
      const w = Math.floor(props.value * (props.width / 100))
      const bg = (chalk as any)[props.bgColor](type)
      const fg = (chalk as any)[props.color](type)
      return fg.repeat(w) + bg.repeat(props.width - w)
    })

    return () => {
      return h('tui:text', content.value)
    }
  },
})
