
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';

interface DataTableProps {
  title: string;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  columns: {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  data: any[];
}

const DataTable = ({ title, onAdd, onEdit, onDelete, columns, data }: DataTableProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onAdd}
          className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
        >
          Add {title.slice(0, -1)}
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={`${item.id}-${column.key}`}>
                  {column.render 
                    ? column.render(item[column.key], item) 
                    : typeof item[column.key] === 'string' && item[column.key].length > 50 
                      ? `${item[column.key].substring(0, 50)}...` 
                      : typeof item[column.key] === 'object' && Array.isArray(item[column.key])
                        ? item[column.key].join(', ')
                        : item[column.key]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <button
                  onClick={() => onEdit(item.id)}
                  className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition"
                >
                  <Trash size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
