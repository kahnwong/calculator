export interface TableColumns {
  [key: string]: string
}

export interface ColumnProps {
  name: string
  label: string
  field: string
  sortable: boolean
}

export function CreateColumnsObject(columnsInput: TableColumns) {
  const columns: ColumnProps[] = []
  for (const key in columnsInput) {
    columns.push({ name: key, label: columnsInput[key] as string, field: key, sortable: true })
  }

  return columns
}
