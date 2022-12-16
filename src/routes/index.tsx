import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div>
      <Link class='mindblow' href='/clock/'>
        CLOCK
      </Link>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Binary Clock'
    }
  ]
}
