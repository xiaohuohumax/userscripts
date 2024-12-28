import { debounce } from 'radash'
import { version } from '../package.json'

type State = 'desc' | 'asc' | 'default'

interface Row {
  element: HTMLTableRowElement
  date: Date
  textContent: string
  id: string
  defaultIndex: number
}

const ID: string = import.meta.env.VITE_APP_ID
const VERSION: string = version
const SORT_BUTTON_ID = `${ID}-sort-button`
const SORT_ICON_MAP: Record<State, string> = {
  desc: '▴',
  asc: '▾',
  default: '=',
}
const STATES = Object.keys(SORT_ICON_MAP) as State[]

function createSortButton(state: State, marginLeft: string = ''): HTMLButtonElement {
  const button = document.createElement('button')
  button.textContent = SORT_ICON_MAP[state]
  button.classList.add(SORT_BUTTON_ID, 'Button', 'Button--iconOnly', 'Button--secondary')
  button.style.width = 'var(--control-xsmall-size)'
  button.style.height = 'var(--control-xsmall-size)'
  button.style.marginLeft = marginLeft
  return button
}

let state: State = 'default'

async function main() {
  const tableElement = document.querySelector<HTMLTableElement>('table[aria-labelledby="folders-and-files"]')

  if (!tableElement) {
    return
  }

  const tableBody = tableElement.querySelector<HTMLTableSectionElement>('tbody')
  if (!tableBody) {
    return
  }

  let isMainTable = true
  let tableHead = tableElement.querySelector<HTMLDivElement>('tbody > tr[class^="Box-sc-"] > td > div > div:last-child')

  if (!tableHead) {
    tableHead = tableElement.querySelector<HTMLDivElement>('thead > tr > th:last-child > div')

    if (!tableHead) {
      return
    }
    isMainTable = false
    const tableHeadParent = tableHead.parentNode as HTMLTableCellElement
    tableHeadParent.style.width = '170px'
  }

  const sortRowsByState = () => {
    const rowElements = Array.from(tableBody.querySelectorAll<HTMLTableRowElement>('tr[class^="react-directory-row"]'))

    const rows: Row[] = rowElements.map((element) => {
      const relativeTimeElement = element.querySelector<HTMLSpanElement>('relative-time')!
      const id = element.getAttribute('id')!
      return {
        element,
        date: new Date(relativeTimeElement.getAttribute('datetime')!),
        textContent: relativeTimeElement.shadowRoot!.textContent!,
        id,
        defaultIndex: Number(id.split('-').pop()!),
      }
    })

    const sortedRows = rows.sort((a, b) => {
      if (state === 'default') {
        return a.defaultIndex - b.defaultIndex
      }
      const aDate = a.date.getTime()
      const bDate = b.date.getTime()

      return a.textContent === b.textContent
        ? 0
        : state === 'asc'
          ? aDate - bDate
          : bDate - aDate
    })

    const tableViewAllFilesElement = tableBody.querySelector<HTMLTableRowElement>('tr[data-testid="view-all-files-row"')

    sortedRows.forEach((row) => {
      row.element.remove()
      tableViewAllFilesElement
        ? tableBody.insertBefore(row.element, tableViewAllFilesElement)
        : tableBody.appendChild(row.element)
    })
  }

  let sortButton = tableHead.querySelector<HTMLButtonElement>(`button.${SORT_BUTTON_ID}`)
  if (!sortButton) {
    sortButton = createSortButton('default', isMainTable ? '0' : '10px')
    tableHead.appendChild(sortButton)
    tableHead.style.display = 'inline-flex'
    tableHead.style.alignItems = 'center'

    sortButton.addEventListener('click', () => {
      state = STATES[(STATES.indexOf(state) + 1) % STATES.length]
      sortRowsByState()
      sortButton!.textContent = SORT_ICON_MAP[state]
    })
  }
}

console.log(`${ID}(v${VERSION})`)

const observer = new MutationObserver(debounce({ delay: 100 }, main))
observer.observe(document.body, {
  childList: true,
  subtree: true,
})
