import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import type { PropType } from '@vue/runtime-core'
import type { KeyDataEvent } from 'vue-termui'
import { TuiText, onInputData } from 'vue-termui'
import chalk from 'chalk'

const SKIP_EVENT_KEY = ['ArrowUp', 'ArrowDown', 'Ctrl', 'Tab', 'Shift', ' ', 'ArrowLeft', 'ArrowRight', 'Enter']

export const Input = defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'text' | 'password'>,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const active = ref(true)
    const content = computed(() => {
      if (active.value) {
        if (props.modelValue) {
          return (
            props.modelValue
            + chalk.inverse(' ')
          )
        }
        else {
          return props.placeholder ? '' : chalk.inverse(' ')
        }
      }
      else {
        return props.modelValue
      }
    })

    function updateValue(value: string) {
      emit('update:modelValue', value)
    }

    onInputData(({ data, event }) => {
      if (!active.value)
        return
      const eventKey = (<KeyDataEvent>event!).key
      if (SKIP_EVENT_KEY.includes(eventKey) || !eventKey)
        return

      // Delete Content
      if (
        eventKey === 'Backspace'
        || eventKey === 'Delete'
        || (eventKey === 'H' && data !== 'H') // Windows compatible
      ) {
        props.modelValue && updateValue(
          props.modelValue.slice(0, props.modelValue.length - 1),
        )
      }
      // Typing Content
      else {
        updateValue(
          props.modelValue
          + data,
        )
      }
    })

    return () =>
      props.placeholder && !props.modelValue
        ? h(
          TuiText,
          {
            dimmed: true,
          },
          () => props.placeholder,
        )
        : h(TuiText, () => content.value)
  },
})
