import { Request, Response } from 'express';
import * as service from '../services/itemsService';

export async function fetchPage(req: Request, res: Response) {
  const page = Number(req.query.page) || 0;
  const pageSize = Number(req.query.pageSize) || 20;
  const filter = String(req.query.filter || '');
  const sort = req.query.sort === 'true';

  const data = service.getPage({ page, pageSize, filter, sort });
  res.json({ data });
}

export async function selectItem(req: Request, res: Response) {
  const { id, selected } = req.body as { id: number; selected: boolean };
  service.updateSelection(id, selected);
  res.sendStatus(200);
}

export async function reorder(req: Request, res: Response) {
  const { order } = req.body as { order: number[] };
  service.updateOrder(order);
  res.sendStatus(200);
}

export async function getAppState(req: Request, res: Response) {
  res.json(service.getState());
}