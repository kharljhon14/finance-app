import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import TableHeadSelect from './table-head-select';

interface Props {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
}

export default function ImportTable({
  headers,
  body,
  selectedColumns,
  onTableHeadSelectChange
}: Props) {
  return (
    <div className="rounded-md border overflow-hidden ">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                  columnIndex={index}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
