import {
  component$,
  useStore,
  useClientEffect$,
} from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'

export const hourBinPlaces = [8, 4, 2, 1]
export const minAndSecBinPlaces = [32, 16, 8, 4, 2, 1]

const Clock = component$(() => {
  const state = useStore({
    hour: 0,
    min: 0,
    sec: 0,
    loaded: false
  })

  useClientEffect$(() => {
    const updateState = () => {
      state.loaded = true
      const date = new Date()
      state.min = date.getMinutes()
      state.hour = date.getHours()
      state.sec = date.getSeconds()
    }
    updateState()
    setInterval(() => updateState(), 1000)
  })

  const hourBinary = (state.hour > 12 ? state.hour - 12 : state.hour)
    .toString(2)
    .padStart(4, '0')
  const minBinary = state.min.toString(2).padStart(6, '0')
  const secBinary = state.sec.toString(2).padStart(6, '0')

  return (
    <div class='clock'>
      <div class={`${state.loaded ? '' : 'hidden'}`}>
        <p class='regular'>
          {state.hour > 12 ? state.hour - 12 : state.hour}:
          {String(state.min).padStart(2, '0')}:
          {String(state.sec).padStart(2, '0')}
          {state.hour >= 12 ? 'PM' : 'AM'}
        </p>
        <div class='hours clock-space'>
          {hourBinPlaces.map((place, i) => (
            <span class={hourBinary[i] === '1' ? 'lit' : 'unlit'}>{place}</span>
          ))}
        </div>
        <div class='mins clock-space'>
          {minAndSecBinPlaces.map((place, i) => (
            <span class={minBinary[i] === '1' ? 'lit' : 'unlit'}>{place}</span>
          ))}
        </div>
        <div class='secs clock-space'>
          {minAndSecBinPlaces.map((place, i) => (
            <span class={secBinary[i] === '1' ? 'lit' : 'unlit'}>{place}</span>
          ))}
        </div>
        <div class='meridian clock-space'>
          <span class={state.hour >= 12 ? 'lit' : 'unlit'}>1</span>
        </div>
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Clock'
}

export default Clock
