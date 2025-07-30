/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const outputFormat = 'yyyy-MM-dd';

const requredOptions = ['amount', 'date', 'payee'];

interface SelectedColumnsState {
  [key: string]: string | null;
}

interface Props {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function ImportCard({ data, onCancel, onSubmit }: Props) {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Import Transactions</CardTitle>
          <div className="flex flex-col lg:flex-row w-full lg:w-auto items-center gap-2">
            <Button
              onClick={onCancel}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>Hello</CardContent>
      </Card>
    </div>
  );
}
