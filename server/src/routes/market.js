import express from 'express';
import MarketIndex from '../models/MarketIndex.js';
import GlobalMarket from '../models/GlobalMarket.js';
import HeatMapSector from '../models/HeatMapSector.js';
import MarketNews from '../models/MarketNews.js';
import TopGainer from '../models/TopGainer.js';

const router = express.Router();

router.get('/indices', async (req, res) => res.json(await MarketIndex.find()));
router.get('/global', async (req, res) => res.json(await GlobalMarket.find()));
router.get('/sectors', async (req, res) => res.json(await HeatMapSector.find()));
router.get('/news', async (req, res) => res.json(await MarketNews.find()));
router.get('/gainers', async (req, res) => res.json(await TopGainer.find()));

export default router;
