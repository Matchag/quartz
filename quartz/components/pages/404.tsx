import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <p><a href="https://quartz.matchag.xyz">Go to main page</a></p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
