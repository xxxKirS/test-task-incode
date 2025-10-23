import type { TBoard } from '@/types';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import { Link } from 'react-router';

export default function BoardCard(board: TBoard) {
  return (
    <Link to={`/${board.hashId}`} className='flex-1 min-w-18 w-auto'>
      <Card>
        <CardHeader>
          <CardTitle className='truncate'>{board.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
