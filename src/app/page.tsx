'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Apple, 
  Carrot, 
  Leaf, 
  Droplets, 
  TrendingUp, 
  Calendar, 
  Target,
  ChefHat,
  Sparkles,
  Check,
  Crown,
  Lock,
  Heart,
  Activity
} from 'lucide-react';

interface NutritionEntry {
  date: string;
  protein: number;
  fiber: number;
  water: number;
}

interface Goals {
  protein: number;
  fiber: number;
  water: number;
}

interface CatalogItem {
  name: string;
  benefits: string;
  category: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fiber: string;
    vitamins: string;
  };
}

export default function FitoSaudePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPremium, setIsPremium] = useState(false);
  
  // Estados de nutrição
  const [protein, setProtein] = useState('');
  const [fiber, setFiber] = useState('');
  const [water, setWater] = useState('');
  const [history, setHistory] = useState<NutritionEntry[]>([]);
  const [goals, setGoals] = useState<Goals>({ protein: 60, fiber: 30, water: 2000 });
  
  // Carregar dados do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('fitoSaudeHistory');
    const savedGoals = localStorage.getItem('fitoSaudeGoals');
    const savedPremium = localStorage.getItem('fitoSaudePremium');
    
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedPremium) setIsPremium(JSON.parse(savedPremium));
  }, []);
  
  // Salvar histórico
  const saveEntry = () => {
    const newEntry: NutritionEntry = {
      date: new Date().toISOString().split('T')[0],
      protein: parseFloat(protein) || 0,
      fiber: parseFloat(fiber) || 0,
      water: parseFloat(water) || 0
    };
    
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('fitoSaudeHistory', JSON.stringify(updatedHistory));
    
    setProtein('');
    setFiber('');
    setWater('');
  };
  
  // Atualizar metas
  const updateGoals = (newGoals: Goals) => {
    setGoals(newGoals);
    localStorage.setItem('fitoSaudeGoals', JSON.stringify(newGoals));
  };
  
  // Dados de hoje
  const todayEntry = history.find(entry => entry.date === new Date().toISOString().split('T')[0]) || {
    protein: 0,
    fiber: 0,
    water: 0
  };
  
  // Catálogo completo com tabelas nutricionais
  const catalog: CatalogItem[] = [
    // CONDIMENTOS (30 itens)
    { name: 'Açafrão', benefits: 'Anti-inflamatório potente, antioxidante, melhora digestão e função cerebral', category: 'Condimentos', nutrition: { calories: '354 kcal/100g', protein: '7.8g', carbs: '65g', fiber: '21g', vitamins: 'Vitamina C, B6, Ferro, Manganês' } },
    { name: 'Alho', benefits: 'Fortalece imunidade, reduz pressão arterial, antibacteriano natural', category: 'Condimentos', nutrition: { calories: '149 kcal/100g', protein: '6.4g', carbs: '33g', fiber: '2.1g', vitamins: 'Vitamina C, B6, Manganês, Selênio' } },
    { name: 'Canela', benefits: 'Controla glicemia, anti-inflamatório, antioxidante poderoso', category: 'Condimentos', nutrition: { calories: '247 kcal/100g', protein: '4g', carbs: '81g', fiber: '53g', vitamins: 'Cálcio, Ferro, Manganês' } },
    { name: 'Cominho', benefits: 'Melhora digestão, rico em ferro, auxilia perda de peso', category: 'Condimentos', nutrition: { calories: '375 kcal/100g', protein: '17.8g', carbs: '44g', fiber: '10.5g', vitamins: 'Ferro, Manganês, Cálcio, Magnésio' } },
    { name: 'Coentro', benefits: 'Desintoxicante natural, melhora digestão, anti-inflamatório', category: 'Condimentos', nutrition: { calories: '23 kcal/100g', protein: '2.1g', carbs: '3.7g', fiber: '2.8g', vitamins: 'Vitamina A, C, K, Potássio' } },
    { name: 'Cravo', benefits: 'Analgésico natural, antibacteriano, melhora saúde bucal', category: 'Condimentos', nutrition: { calories: '274 kcal/100g', protein: '6g', carbs: '65g', fiber: '34g', vitamins: 'Vitamina K, C, Manganês' } },
    { name: 'Gengibre', benefits: 'Anti-náusea, anti-inflamatório, melhora circulação sanguínea', category: 'Condimentos', nutrition: { calories: '80 kcal/100g', protein: '1.8g', carbs: '18g', fiber: '2g', vitamins: 'Vitamina B6, Magnésio, Potássio' } },
    { name: 'Mostarda', benefits: 'Acelera metabolismo, rica em minerais, antioxidante', category: 'Condimentos', nutrition: { calories: '508 kcal/100g', protein: '26g', carbs: '28g', fiber: '12g', vitamins: 'Selênio, Magnésio, Fósforo' } },
    { name: 'Noz-moscada', benefits: 'Melhora sono, anti-inflamatório, auxilia digestão', category: 'Condimentos', nutrition: { calories: '525 kcal/100g', protein: '5.8g', carbs: '49g', fiber: '21g', vitamins: 'Cobre, Manganês, Magnésio' } },
    { name: 'Páprica', benefits: 'Rica em vitamina A, antioxidante, melhora circulação', category: 'Condimentos', nutrition: { calories: '282 kcal/100g', protein: '14g', carbs: '54g', fiber: '34g', vitamins: 'Vitamina A, E, B6, Ferro' } },
    { name: 'Pimenta-do-reino', benefits: 'Melhora absorção de nutrientes, antioxidante, digestivo', category: 'Condimentos', nutrition: { calories: '251 kcal/100g', protein: '10g', carbs: '64g', fiber: '25g', vitamins: 'Vitamina K, Ferro, Manganês' } },
    { name: 'Pimenta Caiena', benefits: 'Acelera metabolismo, analgésico, melhora circulação', category: 'Condimentos', nutrition: { calories: '318 kcal/100g', protein: '12g', carbs: '57g', fiber: '27g', vitamins: 'Vitamina A, C, B6, Potássio' } },
    { name: 'Cardamomo', benefits: 'Digestivo, antioxidante, melhora respiração', category: 'Condimentos', nutrition: { calories: '311 kcal/100g', protein: '11g', carbs: '68g', fiber: '28g', vitamins: 'Ferro, Manganês, Magnésio' } },
    { name: 'Curry em Pó', benefits: 'Anti-inflamatório, antioxidante, melhora digestão', category: 'Condimentos', nutrition: { calories: '325 kcal/100g', protein: '14g', carbs: '55g', fiber: '53g', vitamins: 'Ferro, Vitamina E, K' } },
    { name: 'Endro', benefits: 'Digestivo, calmante, rico em antioxidantes', category: 'Condimentos', nutrition: { calories: '43 kcal/100g', protein: '3.5g', carbs: '7g', fiber: '2.1g', vitamins: 'Vitamina A, C, Cálcio' } },
    { name: 'Erva-doce (semente)', benefits: 'Digestivo, expectorante, calmante natural', category: 'Condimentos', nutrition: { calories: '345 kcal/100g', protein: '15.8g', carbs: '52g', fiber: '39.8g', vitamins: 'Cálcio, Ferro, Magnésio' } },
    { name: 'Feno-grego', benefits: 'Controla glicemia, aumenta lactação, anti-inflamatório', category: 'Condimentos', nutrition: { calories: '323 kcal/100g', protein: '23g', carbs: '58g', fiber: '25g', vitamins: 'Ferro, Magnésio, Manganês' } },
    { name: 'Louro', benefits: 'Digestivo, anti-inflamatório, melhora respiração', category: 'Condimentos', nutrition: { calories: '313 kcal/100g', protein: '7.6g', carbs: '75g', fiber: '26g', vitamins: 'Vitamina A, C, Cálcio' } },
    { name: 'Pimenta Jamaica', benefits: 'Antioxidante, digestivo, analgésico natural', category: 'Condimentos', nutrition: { calories: '263 kcal/100g', protein: '6g', carbs: '72g', fiber: '21g', vitamins: 'Vitamina C, Ferro, Cálcio' } },
    { name: 'Raiz-forte', benefits: 'Antibacteriano, expectorante, estimula digestão', category: 'Condimentos', nutrition: { calories: '48 kcal/100g', protein: '1.2g', carbs: '11g', fiber: '3.3g', vitamins: 'Vitamina C, Potássio, Cálcio' } },
    { name: 'Sal Rosa do Himalaia', benefits: 'Rico em minerais, equilibra pH, hidratação celular', category: 'Condimentos', nutrition: { calories: '0 kcal/100g', protein: '0g', carbs: '0g', fiber: '0g', vitamins: '84 minerais traço' } },
    { name: 'Semente de Mostarda', benefits: 'Anti-inflamatório, rica em ômega-3, antioxidante', category: 'Condimentos', nutrition: { calories: '508 kcal/100g', protein: '26g', carbs: '28g', fiber: '12g', vitamins: 'Selênio, Magnésio, Fósforo' } },
    { name: 'Sumac', benefits: 'Antioxidante potente, anti-inflamatório, digestivo', category: 'Condimentos', nutrition: { calories: '267 kcal/100g', protein: '5g', carbs: '63g', fiber: '14g', vitamins: 'Vitamina C, Ferro' } },
    { name: 'Urucum', benefits: 'Antioxidante, protetor solar natural, anti-inflamatório', category: 'Condimentos', nutrition: { calories: '89 kcal/100g', protein: '4g', carbs: '15g', fiber: '3g', vitamins: 'Vitamina A, E, Carotenoides' } },
    { name: 'Vanilha', benefits: 'Antioxidante, calmante, melhora humor', category: 'Condimentos', nutrition: { calories: '288 kcal/100g', protein: '0.1g', carbs: '12.6g', fiber: '0g', vitamins: 'Magnésio, Potássio, Cálcio' } },
    { name: 'Wasabi', benefits: 'Antibacteriano, anti-inflamatório, melhora circulação', category: 'Condimentos', nutrition: { calories: '109 kcal/100g', protein: '4.8g', carbs: '24g', fiber: '7.8g', vitamins: 'Vitamina C, Potássio, Cálcio' } },
    { name: 'Zimbro', benefits: 'Diurético, digestivo, antioxidante', category: 'Condimentos', nutrition: { calories: '323 kcal/100g', protein: '3.9g', carbs: '73g', fiber: '16g', vitamins: 'Vitamina C, Cobre' } },
    { name: 'Anis Estrelado', benefits: 'Digestivo, expectorante, antiviral', category: 'Condimentos', nutrition: { calories: '337 kcal/100g', protein: '18g', carbs: '50g', fiber: '15g', vitamins: 'Ferro, Cálcio, Magnésio' } },
    { name: 'Pimenta Rosa', benefits: 'Antioxidante, anti-inflamatório, digestivo', category: 'Condimentos', nutrition: { calories: '360 kcal/100g', protein: '4g', carbs: '78g', fiber: '12g', vitamins: 'Vitamina C, Ferro' } },
    { name: 'Açafrão-da-terra', benefits: 'Anti-inflamatório, antioxidante, hepatoprotetor', category: 'Condimentos', nutrition: { calories: '312 kcal/100g', protein: '9.7g', carbs: '67g', fiber: '22.7g', vitamins: 'Ferro, Manganês, Vitamina B6' } },
    
    // ERVAS CULINÁRIAS E MEDICINAIS (40 itens)
    { name: 'Alecrim', benefits: 'Melhora memória e concentração, antioxidante, anti-inflamatório', category: 'Ervas', nutrition: { calories: '131 kcal/100g', protein: '3.3g', carbs: '20g', fiber: '14g', vitamins: 'Vitamina A, C, Cálcio, Ferro' } },
    { name: 'Alfavaca', benefits: 'Calmante natural, digestivo, antibacteriano', category: 'Ervas', nutrition: { calories: '23 kcal/100g', protein: '3.2g', carbs: '2.7g', fiber: '1.6g', vitamins: 'Vitamina K, A, C, Manganês' } },
    { name: 'Boldo', benefits: 'Protetor hepático, digestivo, desintoxicante', category: 'Ervas', nutrition: { calories: '45 kcal/100g', protein: '2.5g', carbs: '8g', fiber: '3g', vitamins: 'Vitamina C, Ferro' } },
    { name: 'Camomila', benefits: 'Calmante, anti-inflamatório, melhora qualidade do sono', category: 'Ervas', nutrition: { calories: '1 kcal/100ml', protein: '0g', carbs: '0.2g', fiber: '0g', vitamins: 'Flavonoides, Apigenina' } },
    { name: 'Capim-limão', benefits: 'Calmante, digestivo, antioxidante, repelente natural', category: 'Ervas', nutrition: { calories: '99 kcal/100g', protein: '1.8g', carbs: '25g', fiber: '0g', vitamins: 'Vitamina A, C, Ácido fólico' } },
    { name: 'Erva-cidreira', benefits: 'Calmante, melhora digestão, antiviral', category: 'Ervas', nutrition: { calories: '44 kcal/100g', protein: '3.7g', carbs: '8g', fiber: '0g', vitamins: 'Vitamina C, Cálcio, Magnésio' } },
    { name: 'Erva-doce', benefits: 'Digestivo, expectorante, calmante, reduz cólicas', category: 'Ervas', nutrition: { calories: '31 kcal/100g', protein: '1.2g', carbs: '7g', fiber: '3.1g', vitamins: 'Vitamina C, Potássio, Cálcio' } },
    { name: 'Hortelã', benefits: 'Digestivo, refrescante, alivia dores de cabeça e náuseas', category: 'Ervas', nutrition: { calories: '70 kcal/100g', protein: '3.8g', carbs: '14.9g', fiber: '8g', vitamins: 'Vitamina A, C, Ferro, Manganês' } },
    { name: 'Manjericão', benefits: 'Anti-inflamatório, antibacteriano, antioxidante potente', category: 'Ervas', nutrition: { calories: '23 kcal/100g', protein: '3.2g', carbs: '2.7g', fiber: '1.6g', vitamins: 'Vitamina K, A, C, Manganês' } },
    { name: 'Orégano', benefits: 'Antibacteriano potente, antioxidante, anti-inflamatório', category: 'Ervas', nutrition: { calories: '265 kcal/100g', protein: '9g', carbs: '69g', fiber: '42.5g', vitamins: 'Vitamina K, Ferro, Cálcio' } },
    { name: 'Sálvia', benefits: 'Melhora memória, anti-inflamatório, antioxidante', category: 'Ervas', nutrition: { calories: '315 kcal/100g', protein: '10.6g', carbs: '60.7g', fiber: '40.3g', vitamins: 'Vitamina K, A, C, Cálcio' } },
    { name: 'Tomilho', benefits: 'Antibacteriano, expectorante, antioxidante', category: 'Ervas', nutrition: { calories: '101 kcal/100g', protein: '5.6g', carbs: '24g', fiber: '14g', vitamins: 'Vitamina C, A, Ferro, Manganês' } },
    { name: 'Alho-poró', benefits: 'Diurético, rico em fibras, antioxidante', category: 'Ervas', nutrition: { calories: '61 kcal/100g', protein: '1.5g', carbs: '14g', fiber: '1.8g', vitamins: 'Vitamina K, A, C, Manganês' } },
    { name: 'Artemísia', benefits: 'Digestivo, antiparasitário, regula ciclo menstrual', category: 'Ervas', nutrition: { calories: '32 kcal/100g', protein: '3.4g', carbs: '5.8g', fiber: '2.3g', vitamins: 'Vitamina A, C, Ferro' } },
    { name: 'Calêndula', benefits: 'Cicatrizante, anti-inflamatório, antioxidante', category: 'Ervas', nutrition: { calories: '52 kcal/100g', protein: '2.8g', carbs: '10g', fiber: '3g', vitamins: 'Vitamina A, C, Flavonoides' } },
    { name: 'Cavalinha', benefits: 'Diurético, remineralizante, fortalece cabelos e unhas', category: 'Ervas', nutrition: { calories: '29 kcal/100g', protein: '0g', carbs: '7g', fiber: '0g', vitamins: 'Silício, Potássio, Magnésio' } },
    { name: 'Cebolinha', benefits: 'Antibacteriana, rica em antioxidantes, melhora digestão', category: 'Ervas', nutrition: { calories: '30 kcal/100g', protein: '1.8g', carbs: '7g', fiber: '2.5g', vitamins: 'Vitamina K, A, C, Ácido fólico' } },
    { name: 'Chapéu-de-couro', benefits: 'Diurético, depurativo, anti-inflamatório', category: 'Ervas', nutrition: { calories: '35 kcal/100g', protein: '2g', carbs: '7g', fiber: '2g', vitamins: 'Flavonoides, Taninos' } },
    { name: 'Dente-de-leão', benefits: 'Depurativo, diurético, protetor hepático', category: 'Ervas', nutrition: { calories: '45 kcal/100g', protein: '2.7g', carbs: '9.2g', fiber: '3.5g', vitamins: 'Vitamina A, C, K, Cálcio' } },
    { name: 'Equinácea', benefits: 'Fortalece imunidade, antiviral, anti-inflamatório', category: 'Ervas', nutrition: { calories: '38 kcal/100g', protein: '1.5g', carbs: '8g', fiber: '2g', vitamins: 'Vitamina C, Ferro' } },
    { name: 'Espinheira-santa', benefits: 'Protetor gástrico, cicatrizante, anti-inflamatório', category: 'Ervas', nutrition: { calories: '42 kcal/100g', protein: '2.2g', carbs: '8.5g', fiber: '3g', vitamins: 'Taninos, Flavonoides' } },
    { name: 'Estévia', benefits: 'Adoçante natural, controla glicemia, zero calorias', category: 'Ervas', nutrition: { calories: '0 kcal/100g', protein: '0g', carbs: '0g', fiber: '0g', vitamins: 'Glicosídeos de esteviol' } },
    { name: 'Funcho', benefits: 'Digestivo, expectorante, reduz gases', category: 'Ervas', nutrition: { calories: '31 kcal/100g', protein: '1.2g', carbs: '7g', fiber: '3.1g', vitamins: 'Vitamina C, Potássio, Cálcio' } },
    { name: 'Ginkgo Biloba', benefits: 'Melhora circulação cerebral, antioxidante, melhora memória', category: 'Ervas', nutrition: { calories: '45 kcal/100g', protein: '2g', carbs: '9g', fiber: '2g', vitamins: 'Flavonoides, Terpenoides' } },
    { name: 'Guaco', benefits: 'Expectorante, broncodilatador, anti-inflamatório', category: 'Ervas', nutrition: { calories: '38 kcal/100g', protein: '1.8g', carbs: '7.5g', fiber: '2.5g', vitamins: 'Cumarina, Vitamina C' } },
    { name: 'Hibisco', benefits: 'Diurético, antioxidante, controla pressão arterial', category: 'Ervas', nutrition: { calories: '37 kcal/100g', protein: '0.4g', carbs: '7.4g', fiber: '0g', vitamins: 'Vitamina C, Antocianinas' } },
    { name: 'Lavanda', benefits: 'Calmante, ansiolítico, melhora qualidade do sono', category: 'Ervas', nutrition: { calories: '49 kcal/100g', protein: '1.4g', carbs: '11g', fiber: '0g', vitamins: 'Óleos essenciais, Linalol' } },
    { name: 'Melissa', benefits: 'Calmante, antiviral, melhora humor', category: 'Ervas', nutrition: { calories: '44 kcal/100g', protein: '3.7g', carbs: '8g', fiber: '0g', vitamins: 'Vitamina C, Ácido rosmarínico' } },
    { name: 'Mil-folhas', benefits: 'Cicatrizante, anti-inflamatório, digestivo', category: 'Ervas', nutrition: { calories: '46 kcal/100g', protein: '2.5g', carbs: '9g', fiber: '3g', vitamins: 'Vitamina K, C, Flavonoides' } },
    { name: 'Passiflora', benefits: 'Calmante natural, ansiolítico, melhora sono', category: 'Ervas', nutrition: { calories: '50 kcal/100g', protein: '2.2g', carbs: '10g', fiber: '3g', vitamins: 'Vitamina C, Flavonoides' } },
    { name: 'Poejo', benefits: 'Digestivo, expectorante, repelente natural', category: 'Ervas', nutrition: { calories: '44 kcal/100g', protein: '3.3g', carbs: '8g', fiber: '2g', vitamins: 'Vitamina A, C, Mentol' } },
    { name: 'Quebra-pedra', benefits: 'Diurético, dissolve cálculos renais, hepatoprotetor', category: 'Ervas', nutrition: { calories: '35 kcal/100g', protein: '1.8g', carbs: '7g', fiber: '2g', vitamins: 'Vitamina C, Potássio' } },
    { name: 'Romã (folhas)', benefits: 'Antioxidante, anti-inflamatório, adstringente', category: 'Ervas', nutrition: { calories: '42 kcal/100g', protein: '2g', carbs: '8.5g', fiber: '3g', vitamins: 'Taninos, Vitamina C' } },
    { name: 'Salsa', benefits: 'Diurético, rica em vitaminas, antioxidante', category: 'Ervas', nutrition: { calories: '36 kcal/100g', protein: '3g', carbs: '6.3g', fiber: '3.3g', vitamins: 'Vitamina K, C, A, Ferro' } },
    { name: 'Sene', benefits: 'Laxante natural, digestivo, desintoxicante', category: 'Ervas', nutrition: { calories: '38 kcal/100g', protein: '1.5g', carbs: '8g', fiber: '2g', vitamins: 'Senósidos, Flavonoides' } },
    { name: 'Tanchagem', benefits: 'Expectorante, cicatrizante, anti-inflamatório', category: 'Ervas', nutrition: { calories: '40 kcal/100g', protein: '2.2g', carbs: '8g', fiber: '2.5g', vitamins: 'Vitamina A, C, K' } },
    { name: 'Urtiga', benefits: 'Remineralizante, diurético, anti-inflamatório', category: 'Ervas', nutrition: { calories: '42 kcal/100g', protein: '2.7g', carbs: '7.1g', fiber: '6.9g', vitamins: 'Vitamina A, C, K, Ferro, Cálcio' } },
    { name: 'Valeriana', benefits: 'Calmante potente, melhora sono, ansiolítico', category: 'Ervas', nutrition: { calories: '44 kcal/100g', protein: '2g', carbs: '9g', fiber: '2g', vitamins: 'Ácido valerênico, GABA' } },
    { name: 'Verbena', benefits: 'Calmante, digestivo, anti-inflamatório', category: 'Ervas', nutrition: { calories: '40 kcal/100g', protein: '2.1g', carbs: '8g', fiber: '2.5g', vitamins: 'Vitamina C, Verbenalina' } },
    { name: 'Zedoária', benefits: 'Digestivo, anti-inflamatório, antioxidante', category: 'Ervas', nutrition: { calories: '48 kcal/100g', protein: '2.5g', carbs: '10g', fiber: '3g', vitamins: 'Curcumina, Vitamina C' } },
    
    // FRUTAS (50 itens)
    { name: 'Abacate', benefits: 'Rico em gorduras boas, vitamina E, melhora colesterol e saúde cardiovascular', category: 'Frutas', nutrition: { calories: '160 kcal/100g', protein: '2g', carbs: '9g', fiber: '7g', vitamins: 'Vitamina K, E, C, B6, Potássio' } },
    { name: 'Abacaxi', benefits: 'Digestivo, anti-inflamatório, rico em vitamina C e bromelina', category: 'Frutas', nutrition: { calories: '50 kcal/100g', protein: '0.5g', carbs: '13g', fiber: '1.4g', vitamins: 'Vitamina C, Manganês, B6' } },
    { name: 'Açaí', benefits: 'Antioxidante potente, energético, rico em fibras e antocianinas', category: 'Frutas', nutrition: { calories: '70 kcal/100g', protein: '1.5g', carbs: '6g', fiber: '3g', vitamins: 'Vitamina A, Cálcio, Ferro' } },
    { name: 'Ameixa', benefits: 'Laxante natural, rica em fibras, antioxidante', category: 'Frutas', nutrition: { calories: '46 kcal/100g', protein: '0.7g', carbs: '11g', fiber: '1.4g', vitamins: 'Vitamina A, C, K, Potássio' } },
    { name: 'Amora', benefits: 'Antioxidante, anti-inflamatório, melhora memória', category: 'Frutas', nutrition: { calories: '43 kcal/100g', protein: '1.4g', carbs: '10g', fiber: '5.3g', vitamins: 'Vitamina C, K, Manganês' } },
    { name: 'Banana', benefits: 'Rica em potássio, energética, melhora humor e digestão', category: 'Frutas', nutrition: { calories: '89 kcal/100g', protein: '1.1g', carbs: '23g', fiber: '2.6g', vitamins: 'Vitamina B6, C, Potássio, Magnésio' } },
    { name: 'Caju', benefits: 'Rico em vitamina C, antioxidante, fortalece imunidade', category: 'Frutas', nutrition: { calories: '43 kcal/100g', protein: '1.7g', carbs: '9g', fiber: '1.7g', vitamins: 'Vitamina C, Cobre, Magnésio' } },
    { name: 'Caqui', benefits: 'Rico em fibras, vitamina A, antioxidante', category: 'Frutas', nutrition: { calories: '70 kcal/100g', protein: '0.6g', carbs: '18g', fiber: '3.6g', vitamins: 'Vitamina A, C, Manganês' } },
    { name: 'Carambola', benefits: 'Baixa caloria, rica em vitamina C, antioxidante', category: 'Frutas', nutrition: { calories: '31 kcal/100g', protein: '1g', carbs: '7g', fiber: '2.8g', vitamins: 'Vitamina C, B5, Potássio' } },
    { name: 'Cereja', benefits: 'Anti-inflamatório, melhora sono, antioxidante potente', category: 'Frutas', nutrition: { calories: '50 kcal/100g', protein: '1g', carbs: '12g', fiber: '1.6g', vitamins: 'Vitamina C, A, Potássio' } },
    { name: 'Coco', benefits: 'Hidratante, energético, rico em minerais e eletrólitos', category: 'Frutas', nutrition: { calories: '354 kcal/100g', protein: '3.3g', carbs: '15g', fiber: '9g', vitamins: 'Manganês, Cobre, Ferro' } },
    { name: 'Damasco', benefits: 'Rico em vitamina A, antioxidante, melhora visão', category: 'Frutas', nutrition: { calories: '48 kcal/100g', protein: '1.4g', carbs: '11g', fiber: '2g', vitamins: 'Vitamina A, C, Potássio' } },
    { name: 'Figo', benefits: 'Rico em fibras, cálcio, digestivo natural', category: 'Frutas', nutrition: { calories: '74 kcal/100g', protein: '0.8g', carbs: '19g', fiber: '2.9g', vitamins: 'Vitamina K, Potássio, Cálcio' } },
    { name: 'Framboesa', benefits: 'Antioxidante potente, rica em fibras, anti-inflamatório', category: 'Frutas', nutrition: { calories: '52 kcal/100g', protein: '1.2g', carbs: '12g', fiber: '6.5g', vitamins: 'Vitamina C, K, Manganês' } },
    { name: 'Goiaba', benefits: 'Rica em vitamina C, fibras, antioxidante, melhora imunidade', category: 'Frutas', nutrition: { calories: '68 kcal/100g', protein: '2.6g', carbs: '14g', fiber: '5.4g', vitamins: 'Vitamina C, A, Potássio' } },
    { name: 'Graviola', benefits: 'Antioxidante, anti-inflamatório, fortalece imunidade', category: 'Frutas', nutrition: { calories: '66 kcal/100g', protein: '1g', carbs: '17g', fiber: '3.3g', vitamins: 'Vitamina C, B1, B2, Potássio' } },
    { name: 'Jabuticaba', benefits: 'Antioxidante, anti-inflamatório, rica em antocianinas', category: 'Frutas', nutrition: { calories: '58 kcal/100g', protein: '0.6g', carbs: '15g', fiber: '2.3g', vitamins: 'Vitamina C, Ferro, Cálcio' } },
    { name: 'Jaca', benefits: 'Rica em fibras, energética, antioxidante', category: 'Frutas', nutrition: { calories: '95 kcal/100g', protein: '1.7g', carbs: '23g', fiber: '1.5g', vitamins: 'Vitamina C, A, Potássio, Magnésio' } },
    { name: 'Jambo', benefits: 'Hidratante, baixa caloria, rico em vitamina C', category: 'Frutas', nutrition: { calories: '25 kcal/100g', protein: '0.6g', carbs: '6g', fiber: '0.9g', vitamins: 'Vitamina C, A, Cálcio' } },
    { name: 'Kiwi', benefits: 'Rico em vitamina C, digestivo, antioxidante', category: 'Frutas', nutrition: { calories: '61 kcal/100g', protein: '1.1g', carbs: '15g', fiber: '3g', vitamins: 'Vitamina C, K, E, Potássio' } },
    { name: 'Laranja', benefits: 'Rica em vitamina C, fortalece imunidade, antioxidante', category: 'Frutas', nutrition: { calories: '47 kcal/100g', protein: '0.9g', carbs: '12g', fiber: '2.4g', vitamins: 'Vitamina C, A, Cálcio, Potássio' } },
    { name: 'Lichia', benefits: 'Antioxidante, rica em vitamina C, melhora circulação', category: 'Frutas', nutrition: { calories: '66 kcal/100g', protein: '0.8g', carbs: '17g', fiber: '1.3g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Limão', benefits: 'Alcalinizante, rico em vitamina C, desintoxicante', category: 'Frutas', nutrition: { calories: '29 kcal/100g', protein: '1.1g', carbs: '9g', fiber: '2.8g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Maçã', benefits: 'Rica em fibras, antioxidante, melhora digestão e saúde cardíaca', category: 'Frutas', nutrition: { calories: '52 kcal/100g', protein: '0.3g', carbs: '14g', fiber: '2.4g', vitamins: 'Vitamina C, K, Potássio' } },
    { name: 'Mamão', benefits: 'Digestivo, rico em vitamina A, laxante natural', category: 'Frutas', nutrition: { calories: '43 kcal/100g', protein: '0.5g', carbs: '11g', fiber: '1.7g', vitamins: 'Vitamina C, A, Ácido fólico' } },
    { name: 'Manga', benefits: 'Rica em vitamina A, antioxidante, digestiva', category: 'Frutas', nutrition: { calories: '60 kcal/100g', protein: '0.8g', carbs: '15g', fiber: '1.6g', vitamins: 'Vitamina A, C, B6, Potássio' } },
    { name: 'Mangostão', benefits: 'Antioxidante potente, anti-inflamatório, fortalece imunidade', category: 'Frutas', nutrition: { calories: '73 kcal/100g', protein: '0.4g', carbs: '18g', fiber: '1.8g', vitamins: 'Vitamina C, B1, B2, Manganês' } },
    { name: 'Maracujá', benefits: 'Calmante natural, rico em fibras, antioxidante', category: 'Frutas', nutrition: { calories: '97 kcal/100g', protein: '2.2g', carbs: '23g', fiber: '10.4g', vitamins: 'Vitamina C, A, Ferro, Potássio' } },
    { name: 'Melancia', benefits: 'Hidratante, diurética, rica em licopeno', category: 'Frutas', nutrition: { calories: '30 kcal/100g', protein: '0.6g', carbs: '8g', fiber: '0.4g', vitamins: 'Vitamina C, A, Licopeno' } },
    { name: 'Melão', benefits: 'Hidratante, diurético, rico em vitamina C', category: 'Frutas', nutrition: { calories: '34 kcal/100g', protein: '0.8g', carbs: '8g', fiber: '0.9g', vitamins: 'Vitamina C, A, Potássio' } },
    { name: 'Mirtilo', benefits: 'Antioxidante potente, melhora memória, anti-inflamatório', category: 'Frutas', nutrition: { calories: '57 kcal/100g', protein: '0.7g', carbs: '14g', fiber: '2.4g', vitamins: 'Vitamina C, K, Manganês' } },
    { name: 'Morango', benefits: 'Antioxidante, rico em vitamina C, anti-inflamatório', category: 'Frutas', nutrition: { calories: '32 kcal/100g', protein: '0.7g', carbs: '8g', fiber: '2g', vitamins: 'Vitamina C, Manganês, Ácido fólico' } },
    { name: 'Nectarina', benefits: 'Rica em vitamina A, antioxidante, digestiva', category: 'Frutas', nutrition: { calories: '44 kcal/100g', protein: '1.1g', carbs: '11g', fiber: '1.7g', vitamins: 'Vitamina A, C, Potássio' } },
    { name: 'Nêspera', benefits: 'Rica em vitamina A, antioxidante, digestiva', category: 'Frutas', nutrition: { calories: '47 kcal/100g', protein: '0.4g', carbs: '12g', fiber: '1.7g', vitamins: 'Vitamina A, C, Potássio' } },
    { name: 'Pera', benefits: 'Rica em fibras, antioxidante, digestiva', category: 'Frutas', nutrition: { calories: '57 kcal/100g', protein: '0.4g', carbs: '15g', fiber: '3.1g', vitamins: 'Vitamina C, K, Potássio' } },
    { name: 'Pêssego', benefits: 'Rico em fibras, vitamina A, antioxidante', category: 'Frutas', nutrition: { calories: '39 kcal/100g', protein: '0.9g', carbs: '10g', fiber: '1.5g', vitamins: 'Vitamina A, C, Potássio' } },
    { name: 'Pitanga', benefits: 'Rica em vitamina C, antioxidante, anti-inflamatório', category: 'Frutas', nutrition: { calories: '33 kcal/100g', protein: '0.8g', carbs: '8g', fiber: '3.2g', vitamins: 'Vitamina C, A, Cálcio' } },
    { name: 'Pitaya', benefits: 'Antioxidante, rica em fibras, fortalece imunidade', category: 'Frutas', nutrition: { calories: '60 kcal/100g', protein: '1.2g', carbs: '13g', fiber: '3g', vitamins: 'Vitamina C, Ferro, Magnésio' } },
    { name: 'Romã', benefits: 'Antioxidante potente, anti-inflamatório, cardioprotetor', category: 'Frutas', nutrition: { calories: '83 kcal/100g', protein: '1.7g', carbs: '19g', fiber: '4g', vitamins: 'Vitamina C, K, Potássio' } },
    { name: 'Tangerina', benefits: 'Rica em vitamina C, antioxidante, fortalece imunidade', category: 'Frutas', nutrition: { calories: '53 kcal/100g', protein: '0.8g', carbs: '13g', fiber: '1.8g', vitamins: 'Vitamina C, A, Potássio' } },
    { name: 'Tamarindo', benefits: 'Laxante natural, antioxidante, rico em minerais', category: 'Frutas', nutrition: { calories: '239 kcal/100g', protein: '2.8g', carbs: '63g', fiber: '5.1g', vitamins: 'Vitamina B1, B3, Potássio, Magnésio' } },
    { name: 'Umbu', benefits: 'Hidratante, rico em vitamina C, antioxidante', category: 'Frutas', nutrition: { calories: '37 kcal/100g', protein: '1.2g', carbs: '8g', fiber: '2.1g', vitamins: 'Vitamina C, Cálcio, Fósforo' } },
    { name: 'Uva', benefits: 'Antioxidante, cardioprotetora, anti-inflamatória', category: 'Frutas', nutrition: { calories: '69 kcal/100g', protein: '0.7g', carbs: '18g', fiber: '0.9g', vitamins: 'Vitamina C, K, Potássio' } },
    { name: 'Uva-passa', benefits: 'Energética, rica em ferro, antioxidante', category: 'Frutas', nutrition: { calories: '299 kcal/100g', protein: '3.1g', carbs: '79g', fiber: '3.7g', vitamins: 'Ferro, Potássio, Vitamina B6' } },
    { name: 'Açaí-banana', benefits: 'Energético, rico em potássio, antioxidante', category: 'Frutas', nutrition: { calories: '80 kcal/100g', protein: '1.3g', carbs: '18g', fiber: '3.5g', vitamins: 'Vitamina A, C, Potássio' } },
    { name: 'Atemoia', benefits: 'Rica em vitamina C, energética, antioxidante', category: 'Frutas', nutrition: { calories: '94 kcal/100g', protein: '2.1g', carbs: '24g', fiber: '2.4g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Cacau', benefits: 'Antioxidante potente, melhora humor, cardioprotetor', category: 'Frutas', nutrition: { calories: '228 kcal/100g', protein: '19.6g', carbs: '57.9g', fiber: '33.2g', vitamins: 'Magnésio, Ferro, Zinco' } },
    { name: 'Cajá', benefits: 'Rico em vitamina C, antioxidante, digestivo', category: 'Frutas', nutrition: { calories: '46 kcal/100g', protein: '1.1g', carbs: '11g', fiber: '1.7g', vitamins: 'Vitamina C, A, Cálcio' } },
    { name: 'Cupuaçu', benefits: 'Antioxidante, energético, fortalece imunidade', category: 'Frutas', nutrition: { calories: '49 kcal/100g', protein: '1.5g', carbs: '11g', fiber: '1.6g', vitamins: 'Vitamina C, B1, B2, B3' } },
    { name: 'Physalis', benefits: 'Antioxidante, anti-inflamatório, rico em vitamina C', category: 'Frutas', nutrition: { calories: '53 kcal/100g', protein: '1.9g', carbs: '11g', fiber: '0g', vitamins: 'Vitamina C, A, Ferro' } },
    
    // LEGUMES E VEGETAIS (50 itens)
    { name: 'Abóbora', benefits: 'Rica em vitamina A, fibras, antioxidante, melhora visão', category: 'Legumes', nutrition: { calories: '26 kcal/100g', protein: '1g', carbs: '7g', fiber: '0.5g', vitamins: 'Vitamina A, C, E, Potássio' } },
    { name: 'Abobrinha', benefits: 'Baixa caloria, rica em fibras, hidratante', category: 'Legumes', nutrition: { calories: '17 kcal/100g', protein: '1.2g', carbs: '3g', fiber: '1g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Acelga', benefits: 'Rica em vitaminas K, A, C, antioxidante', category: 'Legumes', nutrition: { calories: '19 kcal/100g', protein: '1.8g', carbs: '3.7g', fiber: '1.6g', vitamins: 'Vitamina K, A, C, Magnésio' } },
    { name: 'Agrião', benefits: 'Desintoxicante, rico em cálcio, antioxidante', category: 'Legumes', nutrition: { calories: '11 kcal/100g', protein: '2.3g', carbs: '1.3g', fiber: '0.5g', vitamins: 'Vitamina K, C, A, Cálcio' } },
    { name: 'Alcachofra', benefits: 'Hepatoprotetora, digestiva, rica em fibras', category: 'Legumes', nutrition: { calories: '47 kcal/100g', protein: '3.3g', carbs: '11g', fiber: '5.4g', vitamins: 'Vitamina C, K, Ácido fólico, Magnésio' } },
    { name: 'Alface', benefits: 'Hidratante, baixa caloria, rica em vitamina K', category: 'Legumes', nutrition: { calories: '15 kcal/100g', protein: '1.4g', carbs: '2.9g', fiber: '1.3g', vitamins: 'Vitamina K, A, C, Ácido fólico' } },
    { name: 'Almeirão', benefits: 'Digestivo, depurativo, rico em fibras', category: 'Legumes', nutrition: { calories: '23 kcal/100g', protein: '1.7g', carbs: '4.7g', fiber: '3.1g', vitamins: 'Vitamina A, C, Cálcio, Ferro' } },
    { name: 'Aspargo', benefits: 'Diurético, rico em ácido fólico, antioxidante', category: 'Legumes', nutrition: { calories: '20 kcal/100g', protein: '2.2g', carbs: '3.9g', fiber: '2.1g', vitamins: 'Vitamina K, A, C, Ácido fólico' } },
    { name: 'Batata-doce', benefits: 'Energética, rica em fibras, vitamina A', category: 'Legumes', nutrition: { calories: '86 kcal/100g', protein: '1.6g', carbs: '20g', fiber: '3g', vitamins: 'Vitamina A, C, B6, Potássio' } },
    { name: 'Batata-inglesa', benefits: 'Energética, rica em potássio, vitamina C', category: 'Legumes', nutrition: { calories: '77 kcal/100g', protein: '2g', carbs: '17g', fiber: '2.2g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Berinjela', benefits: 'Reduz colesterol, antioxidante, rica em fibras', category: 'Legumes', nutrition: { calories: '25 kcal/100g', protein: '1g', carbs: '6g', fiber: '3g', vitamins: 'Vitamina K, C, B6, Manganês' } },
    { name: 'Beterraba', benefits: 'Melhora circulação, rica em ferro, antioxidante', category: 'Legumes', nutrition: { calories: '43 kcal/100g', protein: '1.6g', carbs: '10g', fiber: '2.8g', vitamins: 'Ácido fólico, Manganês, Potássio' } },
    { name: 'Brócolis', benefits: 'Anticancerígeno, rico em cálcio, vitamina C', category: 'Legumes', nutrition: { calories: '34 kcal/100g', protein: '2.8g', carbs: '7g', fiber: '2.6g', vitamins: 'Vitamina C, K, Ácido fólico, Cálcio' } },
    { name: 'Cebola', benefits: 'Antibacteriana, anti-inflamatória, antioxidante', category: 'Legumes', nutrition: { calories: '40 kcal/100g', protein: '1.1g', carbs: '9g', fiber: '1.7g', vitamins: 'Vitamina C, B6, Manganês' } },
    { name: 'Cenoura', benefits: 'Rica em vitamina A, antioxidante, melhora visão', category: 'Legumes', nutrition: { calories: '41 kcal/100g', protein: '0.9g', carbs: '10g', fiber: '2.8g', vitamins: 'Vitamina A, K, C, Potássio' } },
    { name: 'Chicória', benefits: 'Digestiva, depurativa, rica em fibras', category: 'Legumes', nutrition: { calories: '23 kcal/100g', protein: '1.7g', carbs: '4.7g', fiber: '3.1g', vitamins: 'Vitamina A, K, C, Ácido fólico' } },
    { name: 'Chuchu', benefits: 'Diurético, baixa caloria, rico em fibras', category: 'Legumes', nutrition: { calories: '19 kcal/100g', protein: '0.8g', carbs: '4.5g', fiber: '1.7g', vitamins: 'Vitamina C, B6, Zinco' } },
    { name: 'Cogumelo Shiitake', benefits: 'Fortalece imunidade, antioxidante, rico em vitamina D', category: 'Legumes', nutrition: { calories: '34 kcal/100g', protein: '2.2g', carbs: '7g', fiber: '2.5g', vitamins: 'Vitamina D, B, Selênio, Cobre' } },
    { name: 'Couve', benefits: 'Rica em cálcio, ferro, vitamina K, desintoxicante', category: 'Legumes', nutrition: { calories: '49 kcal/100g', protein: '4.3g', carbs: '9g', fiber: '2g', vitamins: 'Vitamina K, A, C, Cálcio, Ferro' } },
    { name: 'Couve-de-bruxelas', benefits: 'Anticancerígena, rica em vitamina C, K', category: 'Legumes', nutrition: { calories: '43 kcal/100g', protein: '3.4g', carbs: '9g', fiber: '3.8g', vitamins: 'Vitamina C, K, Ácido fólico' } },
    { name: 'Couve-flor', benefits: 'Anticancerígena, rica em fibras, vitamina C', category: 'Legumes', nutrition: { calories: '25 kcal/100g', protein: '1.9g', carbs: '5g', fiber: '2g', vitamins: 'Vitamina C, K, B6, Ácido fólico' } },
    { name: 'Ervilha', benefits: 'Rica em proteínas vegetais, fibras, vitaminas', category: 'Legumes', nutrition: { calories: '81 kcal/100g', protein: '5.4g', carbs: '14g', fiber: '5.7g', vitamins: 'Vitamina K, C, B1, Ácido fólico' } },
    { name: 'Espinafre', benefits: 'Rico em ferro, cálcio, antioxidante', category: 'Legumes', nutrition: { calories: '23 kcal/100g', protein: '2.9g', carbs: '3.6g', fiber: '2.2g', vitamins: 'Vitamina K, A, C, Ferro, Cálcio' } },
    { name: 'Inhame', benefits: 'Energético, anti-inflamatório, fortalece imunidade', category: 'Legumes', nutrition: { calories: '118 kcal/100g', protein: '1.5g', carbs: '28g', fiber: '4.1g', vitamins: 'Vitamina C, B6, Potássio, Manganês' } },
    { name: 'Jiló', benefits: 'Digestivo, rico em fibras, antioxidante', category: 'Legumes', nutrition: { calories: '24 kcal/100g', protein: '1.4g', carbs: '5.4g', fiber: '3.4g', vitamins: 'Vitamina C, B5, Cálcio' } },
    { name: 'Mandioca', benefits: 'Energética, rica em carboidratos, sem glúten', category: 'Legumes', nutrition: { calories: '160 kcal/100g', protein: '1.4g', carbs: '38g', fiber: '1.8g', vitamins: 'Vitamina C, B6, Potássio' } },
    { name: 'Mandioquinha', benefits: 'Digestiva, energética, rica em vitaminas', category: 'Legumes', nutrition: { calories: '133 kcal/100g', protein: '1.2g', carbs: '32g', fiber: '2.3g', vitamins: 'Vitamina A, C, B3, Potássio' } },
    { name: 'Maxixe', benefits: 'Diurético, baixa caloria, rico em fibras', category: 'Legumes', nutrition: { calories: '19 kcal/100g', protein: '0.7g', carbs: '4.2g', fiber: '1.5g', vitamins: 'Vitamina C, Cálcio, Fósforo' } },
    { name: 'Nabo', benefits: 'Diurético, rico em vitamina C, antioxidante', category: 'Legumes', nutrition: { calories: '28 kcal/100g', protein: '0.9g', carbs: '6g', fiber: '1.8g', vitamins: 'Vitamina C, B6, Cálcio' } },
    { name: 'Palmito', benefits: 'Baixa caloria, rico em fibras, minerais', category: 'Legumes', nutrition: { calories: '26 kcal/100g', protein: '2.5g', carbs: '4.6g', fiber: '1.8g', vitamins: 'Vitamina C, B6, Potássio, Zinco' } },
    { name: 'Pepino', benefits: 'Hidratante, diurético, baixa caloria', category: 'Legumes', nutrition: { calories: '15 kcal/100g', protein: '0.7g', carbs: '3.6g', fiber: '0.5g', vitamins: 'Vitamina K, C, Potássio' } },
    { name: 'Pimentão Amarelo', benefits: 'Rico em vitamina C, antioxidante, anti-inflamatório', category: 'Legumes', nutrition: { calories: '27 kcal/100g', protein: '1g', carbs: '6g', fiber: '0.9g', vitamins: 'Vitamina C, A, B6, Ácido fólico' } },
    { name: 'Pimentão Verde', benefits: 'Rico em vitamina C, antioxidante, digestivo', category: 'Legumes', nutrition: { calories: '20 kcal/100g', protein: '0.9g', carbs: '4.6g', fiber: '1.7g', vitamins: 'Vitamina C, B6, K' } },
    { name: 'Pimentão Vermelho', benefits: 'Rico em vitamina C, licopeno, antioxidante', category: 'Legumes', nutrition: { calories: '31 kcal/100g', protein: '1g', carbs: '6g', fiber: '2.1g', vitamins: 'Vitamina C, A, B6, Ácido fólico' } },
    { name: 'Quiabo', benefits: 'Rico em fibras, vitamina C, digestivo', category: 'Legumes', nutrition: { calories: '33 kcal/100g', protein: '1.9g', carbs: '7g', fiber: '3.2g', vitamins: 'Vitamina C, K, Ácido fólico, Magnésio' } },
    { name: 'Rabanete', benefits: 'Digestivo, diurético, rico em vitamina C', category: 'Legumes', nutrition: { calories: '16 kcal/100g', protein: '0.7g', carbs: '3.4g', fiber: '1.6g', vitamins: 'Vitamina C, Potássio, Ácido fólico' } },
    { name: 'Radicchio', benefits: 'Antioxidante, digestivo, rico em vitamina K', category: 'Legumes', nutrition: { calories: '23 kcal/100g', protein: '1.4g', carbs: '4.5g', fiber: '0.9g', vitamins: 'Vitamina K, C, Cobre' } },
    { name: 'Repolho Branco', benefits: 'Anticancerígeno, digestivo, rico em fibras', category: 'Legumes', nutrition: { calories: '25 kcal/100g', protein: '1.3g', carbs: '6g', fiber: '2.5g', vitamins: 'Vitamina C, K, Ácido fólico' } },
    { name: 'Repolho Roxo', benefits: 'Antioxidante potente, anti-inflamatório, anticancerígeno', category: 'Legumes', nutrition: { calories: '31 kcal/100g', protein: '1.4g', carbs: '7g', fiber: '2.1g', vitamins: 'Vitamina C, K, A, Antocianinas' } },
    { name: 'Rúcula', benefits: 'Desintoxicante, rica em cálcio, antioxidante', category: 'Legumes', nutrition: { calories: '25 kcal/100g', protein: '2.6g', carbs: '3.7g', fiber: '1.6g', vitamins: 'Vitamina K, A, C, Cálcio' } },
    { name: 'Salsão', benefits: 'Diurético, anti-inflamatório, baixa caloria', category: 'Legumes', nutrition: { calories: '16 kcal/100g', protein: '0.7g', carbs: '3g', fiber: '1.6g', vitamins: 'Vitamina K, C, Potássio, Ácido fólico' } },
    { name: 'Tomate', benefits: 'Rico em licopeno, antioxidante, cardioprotetor', category: 'Legumes', nutrition: { calories: '18 kcal/100g', protein: '0.9g', carbs: '3.9g', fiber: '1.2g', vitamins: 'Vitamina C, K, Potássio, Licopeno' } },
    { name: 'Tomate Cereja', benefits: 'Antioxidante, rico em licopeno, vitamina C', category: 'Legumes', nutrition: { calories: '18 kcal/100g', protein: '0.9g', carbs: '3.9g', fiber: '1.2g', vitamins: 'Vitamina C, A, Licopeno' } },
    { name: 'Vagem', benefits: 'Rica em fibras, vitamina C, baixa caloria', category: 'Legumes', nutrition: { calories: '31 kcal/100g', protein: '1.8g', carbs: '7g', fiber: '2.7g', vitamins: 'Vitamina C, K, A, Ácido fólico' } },
    { name: 'Abóbora Cabotiá', benefits: 'Rica em betacaroteno, fibras, antioxidante', category: 'Legumes', nutrition: { calories: '40 kcal/100g', protein: '1.1g', carbs: '10g', fiber: '2g', vitamins: 'Vitamina A, C, E, Potássio' } },
    { name: 'Abóbora Moranga', benefits: 'Rica em vitamina A, fibras, minerais', category: 'Legumes', nutrition: { calories: '26 kcal/100g', protein: '1g', carbs: '6.5g', fiber: '0.5g', vitamins: 'Vitamina A, C, Cálcio, Ferro' } },
    { name: 'Batata Baroa', benefits: 'Digestiva, energética, rica em vitamina A', category: 'Legumes', nutrition: { calories: '133 kcal/100g', protein: '1.2g', carbs: '32g', fiber: '2.3g', vitamins: 'Vitamina A, C, B3, Potássio' } },
    { name: 'Beterraba Dourada', benefits: 'Antioxidante, rica em betalaínas, digestiva', category: 'Legumes', nutrition: { calories: '43 kcal/100g', protein: '1.6g', carbs: '10g', fiber: '2.8g', vitamins: 'Ácido fólico, Manganês, Potássio' } },
    { name: 'Couve Kale', benefits: 'Superalimento, rica em cálcio, vitamina K', category: 'Legumes', nutrition: { calories: '49 kcal/100g', protein: '4.3g', carbs: '9g', fiber: '2g', vitamins: 'Vitamina K, A, C, Cálcio, Ferro' } },
    { name: 'Raiz de Lótus', benefits: 'Rica em fibras, vitamina C, antioxidante', category: 'Legumes', nutrition: { calories: '74 kcal/100g', protein: '2.6g', carbs: '17g', fiber: '4.9g', vitamins: 'Vitamina C, B6, Potássio, Cobre' } }
  ];
  
  // Receitas Premium expandidas
  const premiumRecipes = [
    {
      name: 'Bowl de Açaí Energético',
      type: 'Vegano',
      ingredients: ['Açaí', 'Banana', 'Morango', 'Granola', 'Mel'],
      benefits: 'Alto em antioxidantes, energético, rico em fibras',
      prepTime: '10 min'
    },
    {
      name: 'Smoothie Verde Detox',
      type: 'Vegano',
      ingredients: ['Espinafre', 'Abacaxi', 'Gengibre', 'Limão', 'Água de coco'],
      benefits: 'Desintoxicante, anti-inflamatório, hidratante',
      prepTime: '5 min'
    },
    {
      name: 'Salada Arco-Íris',
      type: 'Vegetariano',
      ingredients: ['Rúcula', 'Beterraba', 'Cenoura', 'Tomate', 'Abacate', 'Limão'],
      benefits: 'Rica em vitaminas, antioxidante, cardioprotetora',
      prepTime: '15 min'
    },
    {
      name: 'Curry de Grão-de-Bico',
      type: 'Vegano',
      ingredients: ['Grão-de-bico', 'Açafrão', 'Gengibre', 'Tomate', 'Espinafre', 'Leite de coco'],
      benefits: 'Rico em proteínas, anti-inflamatório, digestivo',
      prepTime: '30 min'
    },
    {
      name: 'Sopa de Abóbora com Gengibre',
      type: 'Vegano',
      ingredients: ['Abóbora', 'Gengibre', 'Alho', 'Cebola', 'Leite de coco'],
      benefits: 'Imunológico, digestivo, anti-inflamatório',
      prepTime: '25 min'
    },
    {
      name: 'Wrap de Hummus e Vegetais',
      type: 'Vegano',
      ingredients: ['Grão-de-bico', 'Pepino', 'Tomate', 'Alface', 'Tahine', 'Tortilla integral'],
      benefits: 'Rico em proteínas, fibras, vitaminas',
      prepTime: '15 min'
    },
    {
      name: 'Risoto de Cogumelos',
      type: 'Vegetariano',
      ingredients: ['Arroz integral', 'Cogumelos shiitake', 'Alho', 'Tomilho', 'Queijo parmesão'],
      benefits: 'Rico em fibras, proteínas, antioxidante',
      prepTime: '40 min'
    },
    {
      name: 'Tacos Veganos de Lentilha',
      type: 'Vegano',
      ingredients: ['Lentilha', 'Cominho', 'Páprica', 'Abacate', 'Tomate', 'Tortilla de milho'],
      benefits: 'Alto em proteínas, fibras, ferro',
      prepTime: '25 min'
    },
    {
      name: 'Buddha Bowl Completo',
      type: 'Vegano',
      ingredients: ['Quinoa', 'Batata-doce', 'Brócolis', 'Grão-de-bico', 'Tahine', 'Couve'],
      benefits: 'Refeição completa, rica em nutrientes',
      prepTime: '35 min'
    },
    {
      name: 'Panquecas de Banana e Aveia',
      type: 'Vegetariano',
      ingredients: ['Banana', 'Aveia', 'Canela', 'Mel', 'Frutas vermelhas'],
      benefits: 'Energético, rico em fibras, antioxidante',
      prepTime: '15 min'
    },
    {
      name: 'Pasta ao Pesto de Rúcula',
      type: 'Vegetariano',
      ingredients: ['Massa integral', 'Rúcula', 'Alho', 'Castanhas', 'Azeite', 'Parmesão'],
      benefits: 'Rico em fibras, antioxidante, cardioprotetor',
      prepTime: '20 min'
    },
    {
      name: 'Chili Vegano',
      type: 'Vegano',
      ingredients: ['Feijão', 'Tomate', 'Pimentão', 'Cominho', 'Páprica', 'Milho'],
      benefits: 'Rico em proteínas, fibras, antioxidante',
      prepTime: '45 min'
    },
    {
      name: 'Hambúrguer de Grão-de-Bico',
      type: 'Vegano',
      ingredients: ['Grão-de-bico', 'Aveia', 'Cebola', 'Alho', 'Cominho', 'Coentro'],
      benefits: 'Alto em proteínas vegetais, fibras',
      prepTime: '30 min'
    },
    {
      name: 'Lasanha de Berinjela',
      type: 'Vegetariano',
      ingredients: ['Berinjela', 'Tomate', 'Manjericão', 'Queijo ricota', 'Mussarela'],
      benefits: 'Baixa em carboidratos, rica em fibras',
      prepTime: '50 min'
    },
    {
      name: 'Falafel Assado',
      type: 'Vegano',
      ingredients: ['Grão-de-bico', 'Salsa', 'Coentro', 'Cominho', 'Alho', 'Tahine'],
      benefits: 'Rico em proteínas, fibras, minerais',
      prepTime: '35 min'
    },
    {
      name: 'Quiche de Espinafre',
      type: 'Vegetariano',
      ingredients: ['Espinafre', 'Ovos', 'Queijo', 'Cebola', 'Massa integral'],
      benefits: 'Rico em ferro, cálcio, proteínas',
      prepTime: '45 min'
    },
    {
      name: 'Strogonoff de Cogumelos',
      type: 'Vegano',
      ingredients: ['Cogumelos', 'Creme de castanha', 'Tomate', 'Mostarda', 'Arroz integral'],
      benefits: 'Rico em proteínas, vitamina D',
      prepTime: '30 min'
    },
    {
      name: 'Pad Thai Vegano',
      type: 'Vegano',
      ingredients: ['Macarrão de arroz', 'Tofu', 'Broto de feijão', 'Amendoim', 'Molho de tamarindo'],
      benefits: 'Rico em proteínas, vitaminas do complexo B',
      prepTime: '25 min'
    },
    {
      name: 'Sushi Vegano',
      type: 'Vegano',
      ingredients: ['Arroz', 'Nori', 'Abacate', 'Pepino', 'Cenoura', 'Gergelim'],
      benefits: 'Baixa caloria, rico em fibras',
      prepTime: '40 min'
    },
    {
      name: 'Pizza Integral de Vegetais',
      type: 'Vegetariano',
      ingredients: ['Massa integral', 'Tomate', 'Pimentão', 'Cogumelos', 'Mussarela', 'Manjericão'],
      benefits: 'Rico em fibras, vitaminas, minerais',
      prepTime: '35 min'
    },
    {
      name: 'Tabule Libanês',
      type: 'Vegano',
      ingredients: ['Trigo para quibe', 'Tomate', 'Pepino', 'Salsa', 'Hortelã', 'Limão'],
      benefits: 'Rico em fibras, vitaminas, refrescante',
      prepTime: '20 min'
    },
    {
      name: 'Moqueca de Palmito',
      type: 'Vegano',
      ingredients: ['Palmito', 'Tomate', 'Pimentão', 'Leite de coco', 'Coentro', 'Dendê'],
      benefits: 'Rico em fibras, baixa caloria',
      prepTime: '30 min'
    },
    {
      name: 'Escondidinho de Batata-doce',
      type: 'Vegano',
      ingredients: ['Batata-doce', 'Proteína de soja', 'Tomate', 'Cebola', 'Alho'],
      benefits: 'Rico em vitamina A, proteínas, fibras',
      prepTime: '45 min'
    },
    {
      name: 'Creme de Abóbora com Castanhas',
      type: 'Vegano',
      ingredients: ['Abóbora', 'Castanha-do-pará', 'Gengibre', 'Leite de coco', 'Noz-moscada'],
      benefits: 'Rico em vitamina A, selênio, antioxidante',
      prepTime: '25 min'
    },
    {
      name: 'Salada de Quinoa Mediterrânea',
      type: 'Vegano',
      ingredients: ['Quinoa', 'Tomate cereja', 'Pepino', 'Azeitona', 'Hortelã', 'Limão'],
      benefits: 'Proteína completa, rica em minerais',
      prepTime: '20 min'
    },
    {
      name: 'Bolinho de Arroz Integral',
      type: 'Vegano',
      ingredients: ['Arroz integral', 'Cenoura', 'Salsinha', 'Alho', 'Farinha de linhaça'],
      benefits: 'Rico em fibras, ômega-3',
      prepTime: '30 min'
    },
    {
      name: 'Cuscuz Marroquino com Vegetais',
      type: 'Vegano',
      ingredients: ['Cuscuz', 'Abobrinha', 'Berinjela', 'Grão-de-bico', 'Cominho', 'Hortelã'],
      benefits: 'Rico em fibras, proteínas, vitaminas',
      prepTime: '25 min'
    },
    {
      name: 'Torta de Legumes',
      type: 'Vegetariano',
      ingredients: ['Massa integral', 'Brócolis', 'Cenoura', 'Ovos', 'Queijo', 'Tomate'],
      benefits: 'Rico em vitaminas, cálcio, proteínas',
      prepTime: '50 min'
    },
    {
      name: 'Nhoque de Batata-doce',
      type: 'Vegano',
      ingredients: ['Batata-doce', 'Farinha integral', 'Molho de tomate', 'Manjericão', 'Alho'],
      benefits: 'Rico em vitamina A, fibras, energético',
      prepTime: '40 min'
    },
    {
      name: 'Berinjela à Parmegiana Vegana',
      type: 'Vegano',
      ingredients: ['Berinjela', 'Molho de tomate', 'Queijo vegano', 'Manjericão', 'Orégano'],
      benefits: 'Baixa caloria, rica em fibras',
      prepTime: '45 min'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Header Melhorado */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 rounded-2xl shadow-lg">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  FitoSaúde
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Seu guia completo de saúde natural</p>
              </div>
            </div>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md px-3 py-1">
                <Crown className="w-3.5 h-3.5 mr-1.5" />
                Premium
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-md border border-emerald-100">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <TrendingUp className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="registro" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Calendar className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Registro</span>
            </TabsTrigger>
            <TabsTrigger 
              value="catalogo" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Apple className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Catálogo</span>
            </TabsTrigger>
            <TabsTrigger 
              value="receitas" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <ChefHat className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Receitas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="metas" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Target className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Metas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="planos" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-2xl transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-700">
                    <div className="bg-blue-500 p-2 rounded-xl shadow-md">
                      <Apple className="w-5 h-5 text-white" />
                    </div>
                    Proteína
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-3xl sm:text-4xl font-bold text-blue-700">{todayEntry.protein}g</span>
                      <span className="text-sm text-blue-600 font-medium">/ {goals.protein}g</span>
                    </div>
                    <Progress value={(todayEntry.protein / goals.protein) * 100} className="h-2.5 bg-blue-200" />
                    <p className="text-xs text-blue-600 font-medium">
                      {Math.round((todayEntry.protein / goals.protein) * 100)}% da meta diária
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-amber-100/50 hover:shadow-2xl transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-amber-700">
                    <div className="bg-amber-500 p-2 rounded-xl shadow-md">
                      <Carrot className="w-5 h-5 text-white" />
                    </div>
                    Fibra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-3xl sm:text-4xl font-bold text-amber-700">{todayEntry.fiber}g</span>
                      <span className="text-sm text-amber-600 font-medium">/ {goals.fiber}g</span>
                    </div>
                    <Progress value={(todayEntry.fiber / goals.fiber) * 100} className="h-2.5 bg-amber-200" />
                    <p className="text-xs text-amber-600 font-medium">
                      {Math.round((todayEntry.fiber / goals.fiber) * 100)}% da meta diária
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 hover:shadow-2xl transition-all sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-cyan-700">
                    <div className="bg-cyan-500 p-2 rounded-xl shadow-md">
                      <Droplets className="w-5 h-5 text-white" />
                    </div>
                    Água
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-3xl sm:text-4xl font-bold text-cyan-700">{todayEntry.water}ml</span>
                      <span className="text-sm text-cyan-600 font-medium">/ {goals.water}ml</span>
                    </div>
                    <Progress value={(todayEntry.water / goals.water) * 100} className="h-2.5 bg-cyan-200" />
                    <p className="text-xs text-cyan-600 font-medium">
                      {Math.round((todayEntry.water / goals.water) * 100)}% da meta diária
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Histórico */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Calendar className="w-5 h-5" />
                  Histórico Recente
                </CardTitle>
                <CardDescription className="text-gray-600">Seus últimos registros nutricionais</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Nenhum registro ainda</p>
                    <p className="text-sm text-gray-400 mt-1">Comece adicionando seus dados!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.slice(0, 5).map((entry, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-semibold text-gray-700">{entry.date}</span>
                        </div>
                        <div className="flex gap-4 sm:gap-6 text-sm font-medium">
                          <span className="flex items-center gap-1 text-blue-600">
                            <Apple className="w-4 h-4" />
                            {entry.protein}g
                          </span>
                          <span className="flex items-center gap-1 text-amber-600">
                            <Carrot className="w-4 h-4" />
                            {entry.fiber}g
                          </span>
                          <span className="flex items-center gap-1 text-cyan-600">
                            <Droplets className="w-4 h-4" />
                            {entry.water}ml
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dicas de Saúde */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Heart className="w-5 h-5" />
                  Dicas de Saúde
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm hover:shadow-md transition-all">
                  <p className="text-sm text-gray-700 font-medium">💧 Beba água regularmente ao longo do dia para manter a hidratação ideal</p>
                </div>
                <div className="p-4 bg-white rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all">
                  <p className="text-sm text-gray-700 font-medium">🥗 Inclua vegetais coloridos em todas as refeições para garantir variedade de nutrientes</p>
                </div>
                <div className="p-4 bg-white rounded-xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-all">
                  <p className="text-sm text-gray-700 font-medium">🌿 Ervas e especiarias não só dão sabor, mas também trazem benefícios medicinais</p>
                </div>
                <div className="p-4 bg-white rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-all">
                  <p className="text-sm text-gray-700 font-medium">🍎 Frutas são excelentes fontes de vitaminas, fibras e antioxidantes naturais</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registro */}
          <TabsContent value="registro">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Calendar className="w-5 h-5" />
                  Registrar Nutrição Diária
                </CardTitle>
                <CardDescription className="text-gray-600">Adicione seus dados nutricionais de hoje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="protein" className="flex items-center gap-2 text-blue-700 font-semibold">
                      <Apple className="w-4 h-4" />
                      Proteína (g)
                    </Label>
                    <Input
                      id="protein"
                      type="number"
                      placeholder="Ex: 45"
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiber" className="flex items-center gap-2 text-amber-700 font-semibold">
                      <Carrot className="w-4 h-4" />
                      Fibra (g)
                    </Label>
                    <Input
                      id="fiber"
                      type="number"
                      placeholder="Ex: 25"
                      value={fiber}
                      onChange={(e) => setFiber(e.target.value)}
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="water" className="flex items-center gap-2 text-cyan-700 font-semibold">
                      <Droplets className="w-4 h-4" />
                      Água (ml)
                    </Label>
                    <Input
                      id="water"
                      type="number"
                      placeholder="Ex: 1500"
                      value={water}
                      onChange={(e) => setWater(e.target.value)}
                      className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
                    />
                  </div>
                </div>
                <Button 
                  onClick={saveEntry} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all rounded-xl py-6 text-base font-semibold"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Salvar Registro
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Catálogo */}
          <TabsContent value="catalogo">
            <div className="space-y-6">
              {['Condimentos', 'Ervas', 'Frutas', 'Legumes'].map((category) => (
                <Card key={category} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      {category === 'Condimentos' && <Leaf className="w-5 h-5 text-amber-600" />}
                      {category === 'Ervas' && <Leaf className="w-5 h-5 text-green-600" />}
                      {category === 'Frutas' && <Apple className="w-5 h-5 text-red-600" />}
                      {category === 'Legumes' && <Carrot className="w-5 h-5 text-orange-600" />}
                      {category}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {catalog.filter(item => item.category === category).length} itens com tabelas nutricionais completas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catalog
                        .filter(item => item.category === category)
                        .map((item, index) => (
                          <div key={index} className="p-5 bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border border-emerald-100 hover:shadow-lg transition-all">
                            <h4 className="font-bold text-gray-800 mb-2 text-lg">{item.name}</h4>
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{item.benefits}</p>
                            <Separator className="my-3 bg-emerald-200" />
                            <div className="space-y-1.5 text-xs">
                              <p className="text-gray-600"><strong className="text-gray-700">Calorias:</strong> {item.nutrition.calories}</p>
                              <p className="text-gray-600"><strong className="text-gray-700">Proteínas:</strong> {item.nutrition.protein}</p>
                              <p className="text-gray-600"><strong className="text-gray-700">Carboidratos:</strong> {item.nutrition.carbs}</p>
                              <p className="text-gray-600"><strong className="text-gray-700">Fibras:</strong> {item.nutrition.fiber}</p>
                              <p className="text-gray-600"><strong className="text-gray-700">Vitaminas/Minerais:</strong> {item.nutrition.vitamins}</p>
                            </div>
                          </div>
                        ))}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Receitas */}
          <TabsContent value="receitas">
            {!isPremium ? (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700">
                    <Lock className="w-5 h-5" />
                    Receitas Premium
                  </CardTitle>
                  <CardDescription className="text-amber-600">Desbloqueie 30+ receitas exclusivas com o plano Premium</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Conteúdo Exclusivo Premium</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Acesse mais de 30 receitas veganas e vegetarianas com benefícios detalhados para sua saúde
                  </p>
                  <Button 
                    onClick={() => setActiveTab('planos')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all rounded-xl px-8 py-6 text-base font-semibold"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Ver Planos Premium
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      <Crown className="w-5 h-5 text-amber-500" />
                      Receitas Premium Desbloqueadas
                    </CardTitle>
                    <CardDescription className="text-emerald-600">30 receitas veganas e vegetarianas exclusivas</CardDescription>
                  </CardHeader>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {premiumRecipes.map((recipe, index) => (
                    <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all bg-white">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-gray-800">{recipe.name}</CardTitle>
                          <Badge className={recipe.type === 'Vegano' ? 'bg-green-500 shadow-md' : 'bg-blue-500 shadow-md'}>
                            {recipe.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">⏱️ {recipe.prepTime}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Ingredientes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {recipe.ingredients.map((ing, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                                {ing}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Separator className="bg-emerald-100" />
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Benefícios:</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{recipe.benefits}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Metas */}
          <TabsContent value="metas">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Target className="w-5 h-5" />
                  Definir Metas Diárias
                </CardTitle>
                <CardDescription className="text-gray-600">Personalize suas metas nutricionais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="goalProtein" className="text-blue-700 font-semibold">Meta de Proteína (g)</Label>
                    <Input
                      id="goalProtein"
                      type="number"
                      value={goals.protein}
                      onChange={(e) => updateGoals({ ...goals, protein: parseFloat(e.target.value) || 0 })}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalFiber" className="text-amber-700 font-semibold">Meta de Fibra (g)</Label>
                    <Input
                      id="goalFiber"
                      type="number"
                      value={goals.fiber}
                      onChange={(e) => updateGoals({ ...goals, fiber: parseFloat(e.target.value) || 0 })}
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalWater" className="text-cyan-700 font-semibold">Meta de Água (ml)</Label>
                    <Input
                      id="goalWater"
                      type="number"
                      value={goals.water}
                      onChange={(e) => updateGoals({ ...goals, water: parseFloat(e.target.value) || 0 })}
                      className="border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Recomendações Gerais
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-gray-800">Proteína:</strong> 0.8-1g por kg de peso corporal (adultos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-gray-800">Fibra:</strong> 25-30g por dia para adultos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-gray-800">Água:</strong> 2000-3000ml por dia (varia com atividade física)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planos */}
          <TabsContent value="planos">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plano Básico */}
              <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="text-center text-gray-800">Básico</CardTitle>
                  <CardDescription className="text-center text-gray-600">Para começar sua jornada</CardDescription>
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold text-gray-800">Grátis</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Dashboard de nutrição</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Registro diário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Catálogo completo (170+ itens)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Tabelas nutricionais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Definir metas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Dicas de saúde</span>
                    </li>
                  </ul>
                  <Button className="w-full rounded-xl" variant="outline" disabled>
                    Plano Atual
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="border-2 border-amber-300 shadow-2xl relative overflow-hidden bg-white hover:shadow-3xl transition-all transform hover:scale-105">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white px-4 py-1.5 text-xs font-bold shadow-lg">
                  RECOMENDADO
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-center flex items-center justify-center gap-2 text-amber-700">
                    <Crown className="w-6 h-6" />
                    Premium
                  </CardTitle>
                  <CardDescription className="text-center text-amber-600">Experiência completa</CardDescription>
                  <div className="text-center py-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      R$ 29,90
                    </span>
                    <span className="text-gray-600 text-lg">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">Tudo do Básico +</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">30+ receitas exclusivas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Receitas veganas e vegetarianas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Planos alimentares personalizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Dicas nutricionais avançadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Suporte prioritário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Atualizações mensais</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all rounded-xl py-6 text-base font-semibold"
                    onClick={() => {
                      setIsPremium(true);
                      localStorage.setItem('fitoSaudePremium', 'true');
                      setActiveTab('receitas');
                    }}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Ativar Premium
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Profissional */}
              <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="text-center text-purple-700">Profissional</CardTitle>
                  <CardDescription className="text-center text-purple-600">Para nutricionistas</CardDescription>
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold text-purple-600">R$ 79,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">Tudo do Premium +</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Gestão de múltiplos pacientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Relatórios detalhados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">API de integração</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Suporte 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Treinamento exclusivo</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl py-6 text-base font-semibold shadow-lg">
                    Em Breve
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
