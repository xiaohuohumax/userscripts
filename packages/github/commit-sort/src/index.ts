import { debounce } from 'radash'
import { version } from '../package.json'
import Store from './store'

interface Row {
  element: HTMLTableRowElement
  date: Date
  id: string
  index: number
}

type TypeOrEmpty<T> = T | null | undefined

const ID: string = import.meta.env.VITE_APP_ID
const VERSION: string = version
const SORT_BUTTON_ID = `${ID}-sort-button`

const store: Store = new Store()

function queryTable(): TypeOrEmpty<HTMLTableElement> {
  return document.querySelector<HTMLTableElement>('table[aria-labelledby="folders-and-files"]')
}

function querySortButtonParent(): { sortButtonParent: TypeOrEmpty<HTMLDivElement>, isMainPage: boolean } {
  const table = queryTable()
  const mainTable = table?.querySelector<HTMLDivElement>(
    'body tr[class^="Box-sc-"] > td > div > div:last-child',
  )
  if (mainTable) {
    return { sortButtonParent: mainTable, isMainPage: true }
  }
  const treeTable = table?.querySelector<HTMLDivElement>(
    'thead > tr > th:last-child > div',
  )
  return { sortButtonParent: treeTable, isMainPage: false }
}

function sortRowsByState(sortButton: HTMLButtonElement, toggle: boolean) {
  const tableBody = queryTable()?.querySelector<HTMLTableSectionElement>('tbody')
  if (!tableBody) {
    return
  }

  const hasSkeleton = tableBody.querySelector('div[class^="Skeleton"]')
  if (hasSkeleton) {
    return
  }

  const rowElements = tableBody.querySelectorAll<HTMLTableRowElement>(
    'tr[class^="react-directory-row"]',
  )

  const rows: Row[] = Array.from(rowElements).map((element) => {
    const relativeTimeElement = element.querySelector<HTMLSpanElement>('relative-time')!
    const id = element.getAttribute('id')!
    const datetime = relativeTimeElement.getAttribute('datetime')!

    return {
      element,
      date: new Date(datetime),
      id,
      index: Number(id.split('-').pop()!),
    }
  })

  toggle && store.toggleState()
  sortButton.textContent = store.sortIcon

  const sortedRows = rows.sort((a, b) => {
    if (store.state === 'default') {
      return a.index - b.index
    }
    const aDate = a.date.getTime()
    const bDate = b.date.getTime()

    return store.state === 'asc'
      ? aDate - bDate
      : bDate - aDate
  })

  const viewAllFilesElement = tableBody.querySelector<HTMLTableRowElement>(
    'tr[data-testid="view-all-files-row"',
  )

  sortedRows.forEach((row) => {
    row.element.remove()
    viewAllFilesElement
      ? tableBody.insertBefore(row.element, viewAllFilesElement)
      : tableBody.appendChild(row.element)
  })
}

function main(observer: MutationObserver) {
  const { sortButtonParent, isMainPage } = querySortButtonParent()
  if (!sortButtonParent) {
    return
  }

  observer && observer.disconnect()

  if (isMainPage) {
    sortButtonParent.style.alignItems = 'center'
  }
  else {
    const th = sortButtonParent.parentNode as HTMLElement
    th.style.width = '170px'
  }

  let sortButton = document.getElementById(SORT_BUTTON_ID) as TypeOrEmpty<HTMLButtonElement>
  if (!sortButton) {
    sortButton = document.createElement('button')
    sortButton.textContent = store.sortIcon
    sortButton.classList.add('Button', 'Button--iconOnly', 'Button--secondary')
    sortButton.id = SORT_BUTTON_ID
    sortButton.style.width = 'var(--control-xsmall-size)'
    sortButton.style.height = 'var(--control-xsmall-size)'
    sortButton.style.marginLeft = isMainPage ? '0' : '10px'
    sortButtonParent.appendChild(sortButton)
    sortButton.addEventListener('click', () => sortRowsByState(sortButton!, true))
  }
  sortRowsByState(sortButton, false)

  observer && observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

console.log(`${ID}(v${VERSION})`)

const mainDebounced = debounce({ delay: 500 }, main)
const observer = new MutationObserver(() => mainDebounced(observer))
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

store.addChangeListener(mainDebounced.bind(null, observer))
