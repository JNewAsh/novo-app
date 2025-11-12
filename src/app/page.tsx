"use client";

import { useState, useEffect } from "react";
import { 
  Search, Leaf, Heart, Clock, BookOpen, Apple, Sparkles, 
  TrendingUp, Target, Droplet, Activity, ChefHat, Lock,
  Calendar, Plus, Minus, Award, Info, X
} from "lucide-react";

// ==================== TIPOS ====================
interface Produto {
  id: string;
  nome: string;
  categoria: "Condimento" | "Erva" | "Erva Medicinal" | "Fruta" | "Legume";
  beneficios: string[];
  tabelaNutricional: {
    calorias: string;
    proteinas: string;
    carboidratos: string;
    fibras: string;
    gorduras: string;
    vitaminas: string[];
    minerais: string[];
  };
  propriedadesMedicinais?: string[];
}

interface Receita {
  id: string;
  nome: string;
  tipo: "Vegana" | "Vegetariana" | "Geral";
  categoria: "Café da Manhã" | "Almoço" | "Jantar" | "Lanche" | "Sobremesa";
  ingredientes: string[];
  modoPreparo: string[];
  tempoPreparo: string;
  porcoes: number;
  beneficios: string[];
  valorNutricional: {
    calorias: string;
    proteinas: string;
    carboidratos: string;
    fibras: string;
  };
}

interface RegistroNutricional {
  data: string;
  proteinas: number;
  fibras: number;
  agua: number;
  calorias: number;
}

interface Meta {
  proteinas: number;
  fibras: number;
  agua: number;
  calorias: number;
}

// ==================== BASE DE DADOS - PRODUTOS ====================
const produtosDB: Produto[] = [
  // CONDIMENTOS
  {
    id: "c1",
    nome: "Açafrão-da-terra (Cúrcuma)",
    categoria: "Condimento",
    beneficios: ["Anti-inflamatório potente", "Antioxidante", "Melhora digestão", "Fortalece imunidade"],
    tabelaNutricional: {
      calorias: "312 kcal/100g",
      proteinas: "9.7g",
      carboidratos: "67g",
      fibras: "22.7g",
      gorduras: "3.2g",
      vitaminas: ["Vitamina C", "Vitamina E", "Vitamina K", "Niacina"],
      minerais: ["Ferro", "Potássio", "Magnésio", "Manganês"]
    },
    propriedadesMedicinais: ["Curcumina combate inflamações", "Protege o fígado", "Auxilia na saúde cerebral"]
  },
  {
    id: "c2",
    nome: "Gengibre",
    categoria: "Condimento",
    beneficios: ["Alivia náuseas", "Anti-inflamatório", "Melhora circulação", "Fortalece imunidade"],
    tabelaNutricional: {
      calorias: "80 kcal/100g",
      proteinas: "1.8g",
      carboidratos: "17.8g",
      fibras: "2g",
      gorduras: "0.8g",
      vitaminas: ["Vitamina C", "Vitamina B6", "Niacina"],
      minerais: ["Potássio", "Magnésio", "Fósforo", "Zinco"]
    },
    propriedadesMedicinais: ["Gingerol combate inflamações", "Alivia dores musculares", "Melhora digestão"]
  },
  {
    id: "c3",
    nome: "Alho",
    categoria: "Condimento",
    beneficios: ["Reduz pressão arterial", "Antibiótico natural", "Reduz colesterol", "Antioxidante"],
    tabelaNutricional: {
      calorias: "149 kcal/100g",
      proteinas: "6.4g",
      carboidratos: "33g",
      fibras: "2.1g",
      gorduras: "0.5g",
      vitaminas: ["Vitamina C", "Vitamina B6", "Tiamina"],
      minerais: ["Manganês", "Selênio", "Cálcio", "Fósforo"]
    },
    propriedadesMedicinais: ["Alicina combate bactérias", "Protege coração", "Fortalece imunidade"]
  },
  {
    id: "c4",
    nome: "Canela",
    categoria: "Condimento",
    beneficios: ["Regula açúcar no sangue", "Antioxidante", "Anti-inflamatório", "Melhora digestão"],
    tabelaNutricional: {
      calorias: "247 kcal/100g",
      proteinas: "4g",
      carboidratos: "81g",
      fibras: "53g",
      gorduras: "1.2g",
      vitaminas: ["Vitamina K", "Vitamina E", "Niacina"],
      minerais: ["Cálcio", "Ferro", "Manganês", "Magnésio"]
    },
    propriedadesMedicinais: ["Cinamaldeído regula glicose", "Combate fungos e bactérias"]
  },
  {
    id: "c5",
    nome: "Pimenta-do-reino",
    categoria: "Condimento",
    beneficios: ["Melhora absorção de nutrientes", "Antioxidante", "Melhora digestão", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "251 kcal/100g",
      proteinas: "10.4g",
      carboidratos: "64g",
      fibras: "25g",
      gorduras: "3.3g",
      vitaminas: ["Vitamina K", "Vitamina C", "Vitamina E"],
      minerais: ["Ferro", "Manganês", "Potássio", "Cobre"]
    },
    propriedadesMedicinais: ["Piperina aumenta absorção em 2000%", "Estimula enzimas digestivas"]
  },
  {
    id: "c6",
    nome: "Cominho",
    categoria: "Condimento",
    beneficios: ["Melhora digestão", "Rico em ferro", "Antioxidante", "Controla diabetes"],
    tabelaNutricional: {
      calorias: "375 kcal/100g",
      proteinas: "17.8g",
      carboidratos: "44g",
      fibras: "10.5g",
      gorduras: "22.3g",
      vitaminas: ["Vitamina A", "Vitamina C", "Vitamina E", "Vitamina K"],
      minerais: ["Ferro", "Cálcio", "Magnésio", "Fósforo"]
    }
  },
  {
    id: "c7",
    nome: "Páprica",
    categoria: "Condimento",
    beneficios: ["Rica em vitamina A", "Antioxidante", "Melhora circulação", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "282 kcal/100g",
      proteinas: "14.1g",
      carboidratos: "54g",
      fibras: "34.9g",
      gorduras: "12.9g",
      vitaminas: ["Vitamina A", "Vitamina E", "Vitamina B6", "Vitamina K"],
      minerais: ["Ferro", "Potássio", "Magnésio", "Fósforo"]
    }
  },
  {
    id: "c8",
    nome: "Orégano",
    categoria: "Condimento",
    beneficios: ["Antibacteriano", "Antioxidante potente", "Anti-inflamatório", "Melhora digestão"],
    tabelaNutricional: {
      calorias: "265 kcal/100g",
      proteinas: "9g",
      carboidratos: "69g",
      fibras: "42.5g",
      gorduras: "4.3g",
      vitaminas: ["Vitamina K", "Vitamina E", "Vitamina A"],
      minerais: ["Cálcio", "Ferro", "Manganês", "Magnésio"]
    },
    propriedadesMedicinais: ["Carvacrol combate bactérias", "Timol é antifúngico"]
  },

  // ERVAS
  {
    id: "e1",
    nome: "Manjericão",
    categoria: "Erva",
    beneficios: ["Antioxidante", "Anti-inflamatório", "Antibacteriano", "Reduz estresse"],
    tabelaNutricional: {
      calorias: "23 kcal/100g",
      proteinas: "3.2g",
      carboidratos: "2.7g",
      fibras: "1.6g",
      gorduras: "0.6g",
      vitaminas: ["Vitamina K", "Vitamina A", "Vitamina C", "Folato"],
      minerais: ["Cálcio", "Ferro", "Magnésio", "Potássio"]
    }
  },
  {
    id: "e2",
    nome: "Salsa",
    categoria: "Erva",
    beneficios: ["Rica em vitamina K", "Antioxidante", "Diurético natural", "Fortalece ossos"],
    tabelaNutricional: {
      calorias: "36 kcal/100g",
      proteinas: "3g",
      carboidratos: "6.3g",
      fibras: "3.3g",
      gorduras: "0.8g",
      vitaminas: ["Vitamina K", "Vitamina C", "Vitamina A", "Folato"],
      minerais: ["Ferro", "Potássio", "Cálcio", "Magnésio"]
    }
  },
  {
    id: "e3",
    nome: "Coentro",
    categoria: "Erva",
    beneficios: ["Desintoxicante", "Melhora digestão", "Antioxidante", "Reduz açúcar no sangue"],
    tabelaNutricional: {
      calorias: "23 kcal/100g",
      proteinas: "2.1g",
      carboidratos: "3.7g",
      fibras: "2.8g",
      gorduras: "0.5g",
      vitaminas: ["Vitamina K", "Vitamina A", "Vitamina C"],
      minerais: ["Potássio", "Cálcio", "Magnésio", "Fósforo"]
    }
  },
  {
    id: "e4",
    nome: "Cebolinha",
    categoria: "Erva",
    beneficios: ["Rica em vitamina K", "Antioxidante", "Melhora digestão", "Fortalece imunidade"],
    tabelaNutricional: {
      calorias: "30 kcal/100g",
      proteinas: "3.3g",
      carboidratos: "4.4g",
      fibras: "2.5g",
      gorduras: "0.7g",
      vitaminas: ["Vitamina K", "Vitamina C", "Vitamina A", "Folato"],
      minerais: ["Cálcio", "Ferro", "Potássio", "Magnésio"]
    }
  },
  {
    id: "e5",
    nome: "Tomilho",
    categoria: "Erva",
    beneficios: ["Antibacteriano", "Antioxidante", "Melhora respiração", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "101 kcal/100g",
      proteinas: "5.6g",
      carboidratos: "24g",
      fibras: "14g",
      gorduras: "1.7g",
      vitaminas: ["Vitamina C", "Vitamina A", "Vitamina K"],
      minerais: ["Ferro", "Manganês", "Cálcio", "Magnésio"]
    }
  },
  {
    id: "e6",
    nome: "Alecrim",
    categoria: "Erva",
    beneficios: ["Melhora memória", "Antioxidante", "Anti-inflamatório", "Melhora circulação"],
    tabelaNutricional: {
      calorias: "131 kcal/100g",
      proteinas: "3.3g",
      carboidratos: "20.7g",
      fibras: "14.1g",
      gorduras: "5.9g",
      vitaminas: ["Vitamina A", "Vitamina C", "Vitamina B6"],
      minerais: ["Cálcio", "Ferro", "Magnésio", "Manganês"]
    }
  },

  // ERVAS MEDICINAIS
  {
    id: "em1",
    nome: "Camomila",
    categoria: "Erva Medicinal",
    beneficios: ["Calmante natural", "Melhora sono", "Anti-inflamatório", "Alivia cólicas"],
    tabelaNutricional: {
      calorias: "1 kcal/100ml (chá)",
      proteinas: "0g",
      carboidratos: "0.2g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina A (traços)"],
      minerais: ["Potássio", "Cálcio", "Magnésio"]
    },
    propriedadesMedicinais: ["Apigenina induz relaxamento", "Bisabolol anti-inflamatório", "Melhora qualidade do sono"]
  },
  {
    id: "em2",
    nome: "Hortelã",
    categoria: "Erva Medicinal",
    beneficios: ["Melhora digestão", "Alivia náuseas", "Refrescante", "Alivia dor de cabeça"],
    tabelaNutricional: {
      calorias: "70 kcal/100g",
      proteinas: "3.8g",
      carboidratos: "14.9g",
      fibras: "8g",
      gorduras: "0.9g",
      vitaminas: ["Vitamina A", "Vitamina C", "Folato"],
      minerais: ["Ferro", "Manganês", "Potássio", "Cálcio"]
    },
    propriedadesMedicinais: ["Mentol relaxa músculos digestivos", "Alivia síndrome do intestino irritável"]
  },
  {
    id: "em3",
    nome: "Boldo",
    categoria: "Erva Medicinal",
    beneficios: ["Protege fígado", "Melhora digestão", "Alivia gases", "Desintoxicante"],
    tabelaNutricional: {
      calorias: "2 kcal/100ml (chá)",
      proteinas: "0.1g",
      carboidratos: "0.4g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina C (traços)"],
      minerais: ["Potássio", "Magnésio"]
    },
    propriedadesMedicinais: ["Boldina estimula bile", "Protege células hepáticas", "Antioxidante"]
  },
  {
    id: "em4",
    nome: "Erva-cidreira (Melissa)",
    categoria: "Erva Medicinal",
    beneficios: ["Calmante", "Melhora humor", "Alivia ansiedade", "Melhora sono"],
    tabelaNutricional: {
      calorias: "1 kcal/100ml (chá)",
      proteinas: "0g",
      carboidratos: "0.3g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina C (traços)"],
      minerais: ["Potássio", "Cálcio", "Magnésio"]
    },
    propriedadesMedicinais: ["Ácido rosmarínico reduz ansiedade", "Melhora função cognitiva"]
  },
  {
    id: "em5",
    nome: "Valeriana",
    categoria: "Erva Medicinal",
    beneficios: ["Induz sono profundo", "Reduz ansiedade", "Relaxante muscular", "Não causa dependência"],
    tabelaNutricional: {
      calorias: "2 kcal/100ml (chá)",
      proteinas: "0.1g",
      carboidratos: "0.5g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina B (traços)"],
      minerais: ["Cálcio", "Magnésio", "Potássio"]
    },
    propriedadesMedicinais: ["Ácido valerênico aumenta GABA", "Melhora qualidade do sono", "Reduz tempo para adormecer"]
  },
  {
    id: "em6",
    nome: "Equinácea",
    categoria: "Erva Medicinal",
    beneficios: ["Fortalece imunidade", "Previne gripes", "Anti-inflamatório", "Antiviral"],
    tabelaNutricional: {
      calorias: "1 kcal/100ml (chá)",
      proteinas: "0g",
      carboidratos: "0.2g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina C (traços)"],
      minerais: ["Ferro", "Potássio"]
    },
    propriedadesMedicinais: ["Estimula células imunes", "Reduz duração de resfriados", "Antioxidante"]
  },
  {
    id: "em7",
    nome: "Espinheira-santa",
    categoria: "Erva Medicinal",
    beneficios: ["Protege estômago", "Alivia gastrite", "Cicatrizante", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "2 kcal/100ml (chá)",
      proteinas: "0.1g",
      carboidratos: "0.4g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina C (traços)"],
      minerais: ["Cálcio", "Magnésio"]
    },
    propriedadesMedicinais: ["Protege mucosa gástrica", "Reduz acidez", "Cicatriza úlceras"]
  },
  {
    id: "em8",
    nome: "Hibisco",
    categoria: "Erva Medicinal",
    beneficios: ["Reduz pressão arterial", "Antioxidante", "Auxilia emagrecimento", "Diurético"],
    tabelaNutricional: {
      calorias: "5 kcal/100ml (chá)",
      proteinas: "0.1g",
      carboidratos: "1.2g",
      fibras: "0g",
      gorduras: "0g",
      vitaminas: ["Vitamina C", "Vitamina A"],
      minerais: ["Ferro", "Cálcio", "Magnésio"]
    },
    propriedadesMedicinais: ["Antocianinas reduzem pressão", "Acelera metabolismo", "Combate radicais livres"]
  },

  // FRUTAS
  {
    id: "f1",
    nome: "Banana",
    categoria: "Fruta",
    beneficios: ["Rica em potássio", "Energia rápida", "Melhora humor", "Regula intestino"],
    tabelaNutricional: {
      calorias: "89 kcal/100g",
      proteinas: "1.1g",
      carboidratos: "22.8g",
      fibras: "2.6g",
      gorduras: "0.3g",
      vitaminas: ["Vitamina B6", "Vitamina C", "Folato"],
      minerais: ["Potássio", "Magnésio", "Manganês"]
    }
  },
  {
    id: "f2",
    nome: "Maçã",
    categoria: "Fruta",
    beneficios: ["Rica em fibras", "Antioxidante", "Controla colesterol", "Melhora digestão"],
    tabelaNutricional: {
      calorias: "52 kcal/100g",
      proteinas: "0.3g",
      carboidratos: "13.8g",
      fibras: "2.4g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina C", "Vitamina K", "Vitamina A"],
      minerais: ["Potássio", "Cálcio", "Fósforo"]
    }
  },
  {
    id: "f3",
    nome: "Laranja",
    categoria: "Fruta",
    beneficios: ["Rica em vitamina C", "Fortalece imunidade", "Antioxidante", "Melhora pele"],
    tabelaNutricional: {
      calorias: "47 kcal/100g",
      proteinas: "0.9g",
      carboidratos: "11.8g",
      fibras: "2.4g",
      gorduras: "0.1g",
      vitaminas: ["Vitamina C", "Vitamina A", "Folato", "Tiamina"],
      minerais: ["Potássio", "Cálcio", "Magnésio"]
    }
  },
  {
    id: "f4",
    nome: "Morango",
    categoria: "Fruta",
    beneficios: ["Antioxidante potente", "Melhora saúde cardíaca", "Controla açúcar", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "32 kcal/100g",
      proteinas: "0.7g",
      carboidratos: "7.7g",
      fibras: "2g",
      gorduras: "0.3g",
      vitaminas: ["Vitamina C", "Folato", "Vitamina K"],
      minerais: ["Potássio", "Manganês", "Magnésio"]
    }
  },
  {
    id: "f5",
    nome: "Abacate",
    categoria: "Fruta",
    beneficios: ["Gorduras saudáveis", "Melhora absorção de nutrientes", "Saúde cardíaca", "Saciedade"],
    tabelaNutricional: {
      calorias: "160 kcal/100g",
      proteinas: "2g",
      carboidratos: "8.5g",
      fibras: "6.7g",
      gorduras: "14.7g",
      vitaminas: ["Vitamina K", "Folato", "Vitamina C", "Vitamina E"],
      minerais: ["Potássio", "Magnésio", "Cobre"]
    }
  },
  {
    id: "f6",
    nome: "Mamão",
    categoria: "Fruta",
    beneficios: ["Melhora digestão", "Rico em vitamina C", "Antioxidante", "Regula intestino"],
    tabelaNutricional: {
      calorias: "43 kcal/100g",
      proteinas: "0.5g",
      carboidratos: "10.8g",
      fibras: "1.7g",
      gorduras: "0.3g",
      vitaminas: ["Vitamina C", "Vitamina A", "Folato", "Vitamina E"],
      minerais: ["Potássio", "Magnésio", "Cálcio"]
    }
  },
  {
    id: "f7",
    nome: "Melancia",
    categoria: "Fruta",
    beneficios: ["Hidratante", "Baixa caloria", "Rica em licopeno", "Melhora circulação"],
    tabelaNutricional: {
      calorias: "30 kcal/100g",
      proteinas: "0.6g",
      carboidratos: "7.6g",
      fibras: "0.4g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina C", "Vitamina A", "Vitamina B6"],
      minerais: ["Potássio", "Magnésio"]
    }
  },
  {
    id: "f8",
    nome: "Uva",
    categoria: "Fruta",
    beneficios: ["Antioxidante", "Melhora saúde cardíaca", "Anti-inflamatório", "Protege cérebro"],
    tabelaNutricional: {
      calorias: "69 kcal/100g",
      proteinas: "0.7g",
      carboidratos: "18.1g",
      fibras: "0.9g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina C", "Vitamina K", "Vitamina B6"],
      minerais: ["Potássio", "Cobre", "Manganês"]
    }
  },
  {
    id: "f9",
    nome: "Kiwi",
    categoria: "Fruta",
    beneficios: ["Rico em vitamina C", "Melhora digestão", "Fortalece imunidade", "Antioxidante"],
    tabelaNutricional: {
      calorias: "61 kcal/100g",
      proteinas: "1.1g",
      carboidratos: "14.7g",
      fibras: "3g",
      gorduras: "0.5g",
      vitaminas: ["Vitamina C", "Vitamina K", "Vitamina E", "Folato"],
      minerais: ["Potássio", "Cobre", "Magnésio"]
    }
  },
  {
    id: "f10",
    nome: "Manga",
    categoria: "Fruta",
    beneficios: ["Rica em vitamina A", "Antioxidante", "Melhora imunidade", "Saúde da pele"],
    tabelaNutricional: {
      calorias: "60 kcal/100g",
      proteinas: "0.8g",
      carboidratos: "15g",
      fibras: "1.6g",
      gorduras: "0.4g",
      vitaminas: ["Vitamina A", "Vitamina C", "Vitamina E", "Folato"],
      minerais: ["Potássio", "Magnésio", "Cobre"]
    }
  },

  // LEGUMES
  {
    id: "l1",
    nome: "Brócolis",
    categoria: "Legume",
    beneficios: ["Anticancerígeno", "Rico em vitamina K", "Fortalece ossos", "Antioxidante"],
    tabelaNutricional: {
      calorias: "34 kcal/100g",
      proteinas: "2.8g",
      carboidratos: "6.6g",
      fibras: "2.6g",
      gorduras: "0.4g",
      vitaminas: ["Vitamina K", "Vitamina C", "Folato", "Vitamina A"],
      minerais: ["Potássio", "Cálcio", "Ferro", "Magnésio"]
    }
  },
  {
    id: "l2",
    nome: "Cenoura",
    categoria: "Legume",
    beneficios: ["Rica em vitamina A", "Melhora visão", "Antioxidante", "Saúde da pele"],
    tabelaNutricional: {
      calorias: "41 kcal/100g",
      proteinas: "0.9g",
      carboidratos: "9.6g",
      fibras: "2.8g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina A", "Vitamina K", "Vitamina C", "Vitamina B6"],
      minerais: ["Potássio", "Manganês", "Fósforo"]
    }
  },
  {
    id: "l3",
    nome: "Espinafre",
    categoria: "Legume",
    beneficios: ["Rico em ferro", "Fortalece ossos", "Antioxidante", "Melhora visão"],
    tabelaNutricional: {
      calorias: "23 kcal/100g",
      proteinas: "2.9g",
      carboidratos: "3.6g",
      fibras: "2.2g",
      gorduras: "0.4g",
      vitaminas: ["Vitamina K", "Vitamina A", "Folato", "Vitamina C"],
      minerais: ["Ferro", "Cálcio", "Magnésio", "Potássio"]
    }
  },
  {
    id: "l4",
    nome: "Tomate",
    categoria: "Legume",
    beneficios: ["Rico em licopeno", "Antioxidante", "Saúde cardíaca", "Protege pele"],
    tabelaNutricional: {
      calorias: "18 kcal/100g",
      proteinas: "0.9g",
      carboidratos: "3.9g",
      fibras: "1.2g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina C", "Vitamina K", "Folato", "Vitamina A"],
      minerais: ["Potássio", "Manganês", "Fósforo"]
    }
  },
  {
    id: "l5",
    nome: "Batata-doce",
    categoria: "Legume",
    beneficios: ["Energia sustentada", "Rica em vitamina A", "Regula açúcar", "Rica em fibras"],
    tabelaNutricional: {
      calorias: "86 kcal/100g",
      proteinas: "1.6g",
      carboidratos: "20.1g",
      fibras: "3g",
      gorduras: "0.1g",
      vitaminas: ["Vitamina A", "Vitamina C", "Vitamina B6", "Folato"],
      minerais: ["Potássio", "Manganês", "Magnésio"]
    }
  },
  {
    id: "l6",
    nome: "Couve",
    categoria: "Legume",
    beneficios: ["Desintoxicante", "Rica em cálcio", "Antioxidante", "Anti-inflamatório"],
    tabelaNutricional: {
      calorias: "49 kcal/100g",
      proteinas: "4.3g",
      carboidratos: "8.8g",
      fibras: "3.6g",
      gorduras: "0.9g",
      vitaminas: ["Vitamina K", "Vitamina A", "Vitamina C", "Folato"],
      minerais: ["Cálcio", "Potássio", "Magnésio", "Ferro"]
    }
  },
  {
    id: "l7",
    nome: "Beterraba",
    categoria: "Legume",
    beneficios: ["Melhora performance", "Reduz pressão", "Desintoxicante", "Rica em folato"],
    tabelaNutricional: {
      calorias: "43 kcal/100g",
      proteinas: "1.6g",
      carboidratos: "9.6g",
      fibras: "2.8g",
      gorduras: "0.2g",
      vitaminas: ["Folato", "Vitamina C", "Vitamina B6"],
      minerais: ["Potássio", "Manganês", "Ferro", "Magnésio"]
    }
  },
  {
    id: "l8",
    nome: "Abobrinha",
    categoria: "Legume",
    beneficios: ["Baixa caloria", "Rica em fibras", "Hidratante", "Melhora digestão"],
    tabelaNutricional: {
      calorias: "17 kcal/100g",
      proteinas: "1.2g",
      carboidratos: "3.1g",
      fibras: "1g",
      gorduras: "0.3g",
      vitaminas: ["Vitamina C", "Vitamina A", "Folato", "Vitamina K"],
      minerais: ["Potássio", "Manganês", "Magnésio"]
    }
  },
  {
    id: "l9",
    nome: "Pimentão",
    categoria: "Legume",
    beneficios: ["Rico em vitamina C", "Antioxidante", "Anti-inflamatório", "Melhora imunidade"],
    tabelaNutricional: {
      calorias: "31 kcal/100g",
      proteinas: "1g",
      carboidratos: "6g",
      fibras: "2.1g",
      gorduras: "0.3g",
      vitaminas: ["Vitamina C", "Vitamina A", "Vitamina B6", "Folato"],
      minerais: ["Potássio", "Manganês", "Magnésio"]
    }
  },
  {
    id: "l10",
    nome: "Berinjela",
    categoria: "Legume",
    beneficios: ["Baixa caloria", "Rica em fibras", "Antioxidante", "Saúde cardíaca"],
    tabelaNutricional: {
      calorias: "25 kcal/100g",
      proteinas: "1g",
      carboidratos: "5.9g",
      fibras: "3g",
      gorduras: "0.2g",
      vitaminas: ["Vitamina K", "Vitamina C", "Vitamina B6", "Folato"],
      minerais: ["Potássio", "Manganês", "Magnésio"]
    }
  }
];

// ==================== BASE DE DADOS - RECEITAS ====================
const receitasDB: Receita[] = [
  // CAFÉ DA MANHÃ
  {
    id: "r1",
    nome: "Smoothie Verde Energizante",
    tipo: "Vegana",
    categoria: "Café da Manhã",
    ingredientes: [
      "1 banana congelada",
      "1 xícara de espinafre fresco",
      "1/2 abacate",
      "1 colher de sopa de gengibre ralado",
      "1 xícara de leite vegetal",
      "1 colher de chá de cúrcuma",
      "Mel ou tâmaras para adoçar"
    ],
    modoPreparo: [
      "Adicione todos os ingredientes no liquidificador",
      "Bata até obter consistência cremosa",
      "Sirva imediatamente",
      "Decore com sementes de chia se desejar"
    ],
    tempoPreparo: "5 minutos",
    porcoes: 1,
    beneficios: ["Energia sustentada", "Rico em antioxidantes", "Anti-inflamatório", "Fortalece imunidade"],
    valorNutricional: {
      calorias: "320 kcal",
      proteinas: "8g",
      carboidratos: "45g",
      fibras: "12g"
    }
  },
  {
    id: "r2",
    nome: "Panquecas de Banana e Aveia",
    tipo: "Vegetariana",
    categoria: "Café da Manhã",
    ingredientes: [
      "2 bananas maduras",
      "1 xícara de aveia em flocos",
      "2 ovos",
      "1 colher de chá de canela",
      "1 pitada de sal",
      "Óleo de coco para untar"
    ],
    modoPreparo: [
      "Amasse as bananas em uma tigela",
      "Adicione ovos, aveia, canela e sal",
      "Misture bem até formar uma massa homogênea",
      "Aqueça uma frigideira com óleo de coco",
      "Despeje porções da massa e cozinhe 2-3 minutos cada lado",
      "Sirva com frutas frescas e mel"
    ],
    tempoPreparo: "15 minutos",
    porcoes: 2,
    beneficios: ["Energia de longa duração", "Rica em fibras", "Controla glicemia", "Saciedade prolongada"],
    valorNutricional: {
      calorias: "280 kcal",
      proteinas: "12g",
      carboidratos: "42g",
      fibras: "7g"
    }
  },
  {
    id: "r3",
    nome: "Bowl de Açaí Completo",
    tipo: "Vegana",
    categoria: "Café da Manhã",
    ingredientes: [
      "200g de polpa de açaí",
      "1 banana",
      "1/2 xícara de morangos",
      "Granola",
      "Coco ralado",
      "Sementes de chia",
      "Mel ou agave"
    ],
    modoPreparo: [
      "Bata a polpa de açaí com metade da banana",
      "Despeje em uma tigela",
      "Decore com frutas fatiadas, granola, coco e chia",
      "Regue com mel se desejar"
    ],
    tempoPreparo: "10 minutos",
    porcoes: 1,
    beneficios: ["Antioxidante potente", "Energia rápida", "Rico em fibras", "Fortalece imunidade"],
    valorNutricional: {
      calorias: "380 kcal",
      proteinas: "6g",
      carboidratos: "58g",
      fibras: "10g"
    }
  },

  // ALMOÇO
  {
    id: "r4",
    nome: "Salada Completa de Quinoa",
    tipo: "Vegana",
    categoria: "Almoço",
    ingredientes: [
      "1 xícara de quinoa cozida",
      "1 xícara de grão-de-bico cozido",
      "2 xícaras de espinafre fresco",
      "1 cenoura ralada",
      "1 beterraba cozida em cubos",
      "1/4 xícara de nozes",
      "Azeite, limão, sal e pimenta para temperar"
    ],
    modoPreparo: [
      "Cozinhe a quinoa conforme instruções da embalagem",
      "Em uma tigela grande, misture quinoa, grão-de-bico e vegetais",
      "Adicione as nozes picadas",
      "Tempere com azeite, suco de limão, sal e pimenta",
      "Misture bem e sirva"
    ],
    tempoPreparo: "25 minutos",
    porcoes: 2,
    beneficios: ["Proteína completa", "Rica em ferro", "Antioxidante", "Saciedade prolongada"],
    valorNutricional: {
      calorias: "420 kcal",
      proteinas: "18g",
      carboidratos: "52g",
      fibras: "14g"
    }
  },
  {
    id: "r5",
    nome: "Curry de Legumes com Cúrcuma",
    tipo: "Vegana",
    categoria: "Almoço",
    ingredientes: [
      "2 batatas-doces em cubos",
      "1 xícara de brócolis",
      "1 xícara de couve-flor",
      "1 lata de leite de coco",
      "2 colheres de sopa de curry",
      "1 colher de chá de cúrcuma",
      "1 colher de sopa de gengibre ralado",
      "2 dentes de alho",
      "Sal e pimenta a gosto"
    ],
    modoPreparo: [
      "Refogue alho e gengibre em óleo de coco",
      "Adicione curry e cúrcuma, refogue por 1 minuto",
      "Adicione batata-doce e cozinhe por 5 minutos",
      "Adicione brócolis, couve-flor e leite de coco",
      "Cozinhe até os legumes ficarem macios (15-20 minutos)",
      "Tempere com sal e pimenta",
      "Sirva com arroz integral"
    ],
    tempoPreparo: "35 minutos",
    porcoes: 4,
    beneficios: ["Anti-inflamatório potente", "Rico em fibras", "Fortalece imunidade", "Antioxidante"],
    valorNutricional: {
      calorias: "340 kcal",
      proteinas: "8g",
      carboidratos: "38g",
      fibras: "9g"
    }
  },
  {
    id: "r6",
    nome: "Wrap de Falafel com Tahine",
    tipo: "Vegana",
    categoria: "Almoço",
    ingredientes: [
      "1 xícara de grão-de-bico cozido",
      "1/4 xícara de salsa fresca",
      "2 dentes de alho",
      "1 colher de chá de cominho",
      "Tortillas integrais",
      "Alface, tomate, pepino",
      "Molho tahine (pasta de gergelim + limão + água)"
    ],
    modoPreparo: [
      "Processe grão-de-bico, salsa, alho e cominho até formar uma massa",
      "Forme bolinhas e asse a 180°C por 20 minutos",
      "Prepare o molho tahine misturando pasta de gergelim, limão e água",
      "Monte o wrap com tortilla, falafel, vegetais e molho",
      "Enrole e sirva"
    ],
    tempoPreparo: "30 minutos",
    porcoes: 2,
    beneficios: ["Rica em proteínas", "Fibras abundantes", "Energia sustentada", "Saúde digestiva"],
    valorNutricional: {
      calorias: "380 kcal",
      proteinas: "16g",
      carboidratos: "48g",
      fibras: "12g"
    }
  },

  // JANTAR
  {
    id: "r7",
    nome: "Sopa Detox de Legumes",
    tipo: "Vegana",
    categoria: "Jantar",
    ingredientes: [
      "2 xícaras de couve picada",
      "1 abobrinha em cubos",
      "1 cenoura em cubos",
      "1 tomate picado",
      "2 dentes de alho",
      "1 colher de sopa de gengibre ralado",
      "1 litro de caldo de legumes",
      "Suco de 1 limão",
      "Sal, pimenta e cúrcuma"
    ],
    modoPreparo: [
      "Refogue alho e gengibre em azeite",
      "Adicione os legumes e refogue por 5 minutos",
      "Adicione o caldo de legumes e cozinhe por 15 minutos",
      "Tempere com sal, pimenta e cúrcuma",
      "Finalize com suco de limão",
      "Sirva quente"
    ],
    tempoPreparo: "25 minutos",
    porcoes: 3,
    beneficios: ["Desintoxicante", "Baixa caloria", "Rica em fibras", "Hidratante"],
    valorNutricional: {
      calorias: "120 kcal",
      proteinas: "4g",
      carboidratos: "22g",
      fibras: "6g"
    }
  },
  {
    id: "r8",
    nome: "Risoto de Cogumelos e Espinafre",
    tipo: "Vegetariana",
    categoria: "Jantar",
    ingredientes: [
      "1 xícara de arroz arbóreo",
      "200g de cogumelos variados",
      "2 xícaras de espinafre",
      "1 cebola picada",
      "2 dentes de alho",
      "1/2 xícara de vinho branco",
      "4 xícaras de caldo de legumes quente",
      "Queijo parmesão ralado",
      "Azeite, sal e pimenta"
    ],
    modoPreparo: [
      "Refogue cebola e alho em azeite",
      "Adicione o arroz e refogue por 2 minutos",
      "Adicione o vinho e deixe evaporar",
      "Adicione o caldo aos poucos, mexendo sempre",
      "Quando o arroz estiver quase pronto, adicione cogumelos e espinafre",
      "Finalize com queijo parmesão",
      "Sirva imediatamente"
    ],
    tempoPreparo: "40 minutos",
    porcoes: 3,
    beneficios: ["Rico em ferro", "Proteínas vegetais", "Energia sustentada", "Fortalece ossos"],
    valorNutricional: {
      calorias: "360 kcal",
      proteinas: "12g",
      carboidratos: "54g",
      fibras: "5g"
    }
  },
  {
    id: "r9",
    nome: "Berinjela Recheada Mediterrânea",
    tipo: "Vegana",
    categoria: "Jantar",
    ingredientes: [
      "2 berinjelas grandes",
      "1 xícara de quinoa cozida",
      "1 xícara de tomate picado",
      "1/2 xícara de azeitonas pretas",
      "1/4 xícara de manjericão fresco",
      "2 dentes de alho",
      "Azeite, sal, pimenta e orégano"
    ],
    modoPreparo: [
      "Corte as berinjelas ao meio e retire a polpa",
      "Pique a polpa e refogue com alho",
      "Misture com quinoa, tomate, azeitonas e manjericão",
      "Tempere com sal, pimenta e orégano",
      "Recheie as berinjelas",
      "Asse a 180°C por 30 minutos",
      "Sirva quente"
    ],
    tempoPreparo: "45 minutos",
    porcoes: 2,
    beneficios: ["Baixa caloria", "Rica em fibras", "Antioxidante", "Saúde cardíaca"],
    valorNutricional: {
      calorias: "280 kcal",
      proteinas: "10g",
      carboidratos: "38g",
      fibras: "11g"
    }
  },

  // LANCHES
  {
    id: "r10",
    nome: "Hummus de Grão-de-Bico",
    tipo: "Vegana",
    categoria: "Lanche",
    ingredientes: [
      "1 xícara de grão-de-bico cozido",
      "2 colheres de sopa de tahine",
      "2 dentes de alho",
      "Suco de 1 limão",
      "2 colheres de sopa de azeite",
      "1 colher de chá de cominho",
      "Sal e páprica"
    ],
    modoPreparo: [
      "Processe todos os ingredientes no liquidificador",
      "Adicione água aos poucos até obter consistência cremosa",
      "Tempere com sal a gosto",
      "Sirva com palitos de cenoura, pepino e pimentão",
      "Finalize com azeite e páprica por cima"
    ],
    tempoPreparo: "10 minutos",
    porcoes: 4,
    beneficios: ["Rica em proteínas", "Gorduras saudáveis", "Saciedade", "Energia sustentada"],
    valorNutricional: {
      calorias: "180 kcal",
      proteinas: "7g",
      carboidratos: "18g",
      fibras: "5g"
    }
  },
  {
    id: "r11",
    nome: "Barrinhas de Aveia e Frutas",
    tipo: "Vegana",
    categoria: "Lanche",
    ingredientes: [
      "2 xícaras de aveia em flocos",
      "1 xícara de tâmaras sem caroço",
      "1/2 xícara de amêndoas",
      "1/4 xícara de cranberries secas",
      "2 colheres de sopa de manteiga de amendoim",
      "1 colher de chá de canela"
    ],
    modoPreparo: [
      "Processe as tâmaras até formar uma pasta",
      "Misture com aveia, amêndoas picadas, cranberries e canela",
      "Adicione manteiga de amendoim e misture bem",
      "Pressione a mistura em uma forma retangular",
      "Leve à geladeira por 2 horas",
      "Corte em barrinhas e armazene"
    ],
    tempoPreparo: "15 minutos + 2h geladeira",
    porcoes: 8,
    beneficios: ["Energia rápida", "Rica em fibras", "Sem açúcar refinado", "Saciedade"],
    valorNutricional: {
      calorias: "220 kcal",
      proteinas: "6g",
      carboidratos: "32g",
      fibras: "5g"
    }
  },

  // SOBREMESAS
  {
    id: "r12",
    nome: "Mousse de Abacate com Cacau",
    tipo: "Vegana",
    categoria: "Sobremesa",
    ingredientes: [
      "2 abacates maduros",
      "1/4 xícara de cacau em pó",
      "1/4 xícara de mel ou agave",
      "1 colher de chá de baunilha",
      "Pitada de sal",
      "Frutas vermelhas para decorar"
    ],
    modoPreparo: [
      "Bata todos os ingredientes no liquidificador até ficar cremoso",
      "Ajuste o dulçor se necessário",
      "Distribua em taças",
      "Leve à geladeira por 1 hora",
      "Decore com frutas vermelhas antes de servir"
    ],
    tempoPreparo: "10 minutos + 1h geladeira",
    porcoes: 4,
    beneficios: ["Gorduras saudáveis", "Antioxidante", "Sem açúcar refinado", "Saciedade"],
    valorNutricional: {
      calorias: "240 kcal",
      proteinas: "3g",
      carboidratos: "28g",
      fibras: "8g"
    }
  }
];

// ==================== COMPONENTE PRINCIPAL ====================
export default function Home() {
  const [activeTab, setActiveTab] = useState<"catalogo" | "receitas" | "dashboard">("catalogo");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todos");
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  
  // Estados do Dashboard Premium
  const [registros, setRegistros] = useState<RegistroNutricional[]>([]);
  const [metas, setMetas] = useState<Meta>({
    proteinas: 60,
    fibras: 30,
    agua: 2000,
    calorias: 2000
  });
  const [registroAtual, setRegistroAtual] = useState({
    proteinas: 0,
    fibras: 0,
    agua: 0,
    calorias: 0
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedPremium = localStorage.getItem("fitosaude_premium");
    const savedRegistros = localStorage.getItem("fitosaude_registros");
    const savedMetas = localStorage.getItem("fitosaude_metas");
    
    if (savedPremium) setIsPremium(JSON.parse(savedPremium));
    if (savedRegistros) setRegistros(JSON.parse(savedRegistros));
    if (savedMetas) setMetas(JSON.parse(savedMetas));
  }, []);

  // Filtrar produtos
  const produtosFiltrados = produtosDB.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.beneficios.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategoria = selectedCategoria === "Todos" || produto.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  // Filtrar receitas
  const receitasFiltradas = receitasDB.filter(receita => {
    const matchesSearch = receita.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receita.ingredientes.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const categorias = ["Todos", "Condimento", "Erva", "Erva Medicinal", "Fruta", "Legume"];

  // Adicionar registro
  const adicionarRegistro = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const novoRegistro: RegistroNutricional = {
      data: hoje,
      ...registroAtual
    };
    
    const novosRegistros = [...registros.filter(r => r.data !== hoje), novoRegistro];
    setRegistros(novosRegistros);
    localStorage.setItem("fitosaude_registros", JSON.stringify(novosRegistros));
    
    setRegistroAtual({ proteinas: 0, fibras: 0, agua: 0, calorias: 0 });
  };

  // Calcular progresso
  const calcularProgresso = (valor: number, meta: number) => {
    return Math.min((valor / meta) * 100, 100);
  };

  // Registro de hoje
  const registroHoje = registros.find(r => r.data === new Date().toISOString().split('T')[0]) || {
    proteinas: 0,
    fibras: 0,
    agua: 0,
    calorias: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-2xl shadow-lg">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  FitoSaúde
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Seu guia completo de saúde natural</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setIsPremium(!isPremium);
                localStorage.setItem("fitosaude_premium", JSON.stringify(!isPremium));
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                isPremium
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {isPremium ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              <span className="hidden sm:inline">{isPremium ? "Premium" : "Gratuito"}</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab("catalogo")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === "catalogo"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-emerald-50"
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>Catálogo</span>
            </button>
            <button
              onClick={() => setActiveTab("receitas")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === "receitas"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-emerald-50"
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Receitas</span>
              {isPremium && <Award className="w-3 h-3 text-amber-300" />}
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-emerald-50"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
              {isPremium && <Award className="w-3 h-3 text-amber-300" />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* TAB: CATÁLOGO */}
        {activeTab === "catalogo" && (
          <div className="space-y-6">
            {/* Busca e Filtros */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-emerald-100">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busque por produto ou benefício..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoria(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategoria === cat
                        ? "bg-emerald-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {produtosFiltrados.map(produto => (
                <div
                  key={produto.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProduto(produto)}
                >
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{produto.nome}</h3>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                      {produto.categoria}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Benefícios
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {produto.beneficios.slice(0, 3).map((ben, i) => (
                          <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs">
                            {ben}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Info className="w-4 h-4" />
                      Ver Tabela Nutricional
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: RECEITAS */}
        {activeTab === "receitas" && (
          <div className="space-y-6">
            {!isPremium && (
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl shadow-lg p-6 text-center">
                <Lock className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">Conteúdo Premium</h3>
                <p className="mb-4">Desbloqueie receitas exclusivas, veganas e vegetarianas!</p>
                <button
                  onClick={() => {
                    setIsPremium(true);
                    localStorage.setItem("fitosaude_premium", JSON.stringify(true));
                  }}
                  className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Ativar Premium
                </button>
              </div>
            )}

            {isPremium && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-emerald-100">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Busque por receita ou ingrediente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {receitasFiltradas.map(receita => (
                    <div
                      key={receita.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedReceita(receita)}
                    >
                      <div className="bg-gradient-to-br from-green-500 to-teal-600 p-4 sm:p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{receita.nome}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                            {receita.tipo}
                          </span>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                            {receita.categoria}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {receita.tempoPreparo}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-emerald-50 p-2 rounded-lg">
                            <span className="font-semibold text-emerald-700">Calorias:</span> {receita.valorNutricional.calorias}
                          </div>
                          <div className="bg-emerald-50 p-2 rounded-lg">
                            <span className="font-semibold text-emerald-700">Proteínas:</span> {receita.valorNutricional.proteinas}
                          </div>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                          Ver Receita Completa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {!isPremium && (
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl shadow-lg p-6 text-center">
                <Lock className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">Dashboard Premium</h3>
                <p className="mb-4">Acompanhe sua nutrição diária com gráficos e metas personalizadas!</p>
                <button
                  onClick={() => {
                    setIsPremium(true);
                    localStorage.setItem("fitosaude_premium", JSON.stringify(true));
                  }}
                  className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Ativar Premium
                </button>
              </div>
            )}

            {isPremium && (
              <>
                {/* Estatísticas do Dia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Proteínas</h3>
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 mb-2">{registroHoje.proteinas}g</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${calcularProgresso(registroHoje.proteinas, metas.proteinas)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Meta: {metas.proteinas}g</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Fibras</h3>
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">{registroHoje.fibras}g</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${calcularProgresso(registroHoje.fibras, metas.fibras)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Meta: {metas.fibras}g</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Água</h3>
                      <Droplet className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{registroHoje.agua}ml</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${calcularProgresso(registroHoje.agua, metas.agua)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Meta: {metas.agua}ml</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Calorias</h3>
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-600 mb-2">{registroHoje.calorias}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${calcularProgresso(registroHoje.calorias, metas.calorias)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Meta: {metas.calorias} kcal</p>
                  </div>
                </div>

                {/* Formulário de Registro */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-600" />
                    Registrar Consumo
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Proteínas (g)</label>
                      <input
                        type="number"
                        value={registroAtual.proteinas}
                        onChange={(e) => setRegistroAtual({...registroAtual, proteinas: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fibras (g)</label>
                      <input
                        type="number"
                        value={registroAtual.fibras}
                        onChange={(e) => setRegistroAtual({...registroAtual, fibras: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Água (ml)</label>
                      <input
                        type="number"
                        value={registroAtual.agua}
                        onChange={(e) => setRegistroAtual({...registroAtual, agua: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Calorias</label>
                      <input
                        type="number"
                        value={registroAtual.calorias}
                        onChange={(e) => setRegistroAtual({...registroAtual, calorias: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={adicionarRegistro}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Adicionar ao Registro de Hoje
                  </button>
                </div>

                {/* Histórico */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    Histórico Nutricional
                  </h3>
                  
                  {registros.length > 0 ? (
                    <div className="space-y-3">
                      {registros.slice(-7).reverse().map((reg, index) => (
                        <div key={index} className="bg-emerald-50 rounded-xl p-4">
                          <p className="font-semibold text-gray-800 mb-2">{new Date(reg.data).toLocaleDateString('pt-BR')}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Proteínas:</span>
                              <span className="font-semibold text-emerald-700 ml-1">{reg.proteinas}g</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Fibras:</span>
                              <span className="font-semibold text-green-700 ml-1">{reg.fibras}g</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Água:</span>
                              <span className="font-semibold text-blue-700 ml-1">{reg.agua}ml</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Calorias:</span>
                              <span className="font-semibold text-orange-700 ml-1">{reg.calorias}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Nenhum registro ainda. Comece a registrar sua nutrição!</p>
                  )}
                </div>

                {/* Dicas de Tratamento */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Dicas de Saúde Premium
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">💧</span>
                      <p>Beba água regularmente ao longo do dia para manter hidratação ideal</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🥗</span>
                      <p>Inclua vegetais verdes em todas as refeições para aumentar fibras</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🌿</span>
                      <p>Combine ervas medicinais com alimentação balanceada para melhores resultados</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">⏰</span>
                      <p>Mantenha horários regulares de refeições para melhor digestão</p>
                    </li>
                  </ul>
                </div>

                {/* Definir Metas */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Definir Metas Diárias
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Proteínas (g)</label>
                      <input
                        type="number"
                        value={metas.proteinas}
                        onChange={(e) => {
                          const novasMetas = {...metas, proteinas: Number(e.target.value)};
                          setMetas(novasMetas);
                          localStorage.setItem("fitosaude_metas", JSON.stringify(novasMetas));
                        }}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Fibras (g)</label>
                      <input
                        type="number"
                        value={metas.fibras}
                        onChange={(e) => {
                          const novasMetas = {...metas, fibras: Number(e.target.value)};
                          setMetas(novasMetas);
                          localStorage.setItem("fitosaude_metas", JSON.stringify(novasMetas));
                        }}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Água (ml)</label>
                      <input
                        type="number"
                        value={metas.agua}
                        onChange={(e) => {
                          const novasMetas = {...metas, agua: Number(e.target.value)};
                          setMetas(novasMetas);
                          localStorage.setItem("fitosaude_metas", JSON.stringify(novasMetas));
                        }}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Calorias</label>
                      <input
                        type="number"
                        value={metas.calorias}
                        onChange={(e) => {
                          const novasMetas = {...metas, calorias: Number(e.target.value)};
                          setMetas(novasMetas);
                          localStorage.setItem("fitosaude_metas", JSON.stringify(novasMetas));
                        }}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Modal Produto */}
      {selectedProduto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 sm:p-8 sticky top-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedProduto.nome}</h2>
                  <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm text-white font-medium">
                    {selectedProduto.categoria}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProduto(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Tabela Nutricional */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Tabela Nutricional (100g)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="font-medium text-gray-700">Calorias</span>
                    <span className="font-bold text-emerald-700">{selectedProduto.tabelaNutricional.calorias}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="font-medium text-gray-700">Proteínas</span>
                    <span className="font-bold text-emerald-700">{selectedProduto.tabelaNutricional.proteinas}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="font-medium text-gray-700">Carboidratos</span>
                    <span className="font-bold text-emerald-700">{selectedProduto.tabelaNutricional.carboidratos}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="font-medium text-gray-700">Fibras</span>
                    <span className="font-bold text-emerald-700">{selectedProduto.tabelaNutricional.fibras}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="font-medium text-gray-700">Gorduras</span>
                    <span className="font-bold text-emerald-700">{selectedProduto.tabelaNutricional.gorduras}</span>
                  </div>
                </div>
              </div>

              {/* Vitaminas */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">💊 Vitaminas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduto.tabelaNutricional.vitaminas.map((vit, i) => (
                    <span key={i} className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                      {vit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Minerais */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">⚡ Minerais</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduto.tabelaNutricional.minerais.map((min, i) => (
                    <span key={i} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {min}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefícios */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">✨ Benefícios para a Saúde</h3>
                <ul className="space-y-2">
                  {selectedProduto.beneficios.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Propriedades Medicinais */}
              {selectedProduto.propriedadesMedicinais && (
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🌿 Propriedades Medicinais</h3>
                  <ul className="space-y-2">
                    {selectedProduto.propriedadesMedicinais.map((prop, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{prop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Receita */}
      {selectedReceita && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 sm:p-8 sticky top-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedReceita.nome}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white font-medium">
                      {selectedReceita.tipo}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white font-medium">
                      {selectedReceita.categoria}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReceita(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Info Rápida */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <Clock className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">Tempo de Preparo</p>
                  <p className="font-bold text-green-700">{selectedReceita.tempoPreparo}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <ChefHat className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">Porções</p>
                  <p className="font-bold text-green-700">{selectedReceita.porcoes} pessoa(s)</p>
                </div>
              </div>

              {/* Valor Nutricional */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Valor Nutricional (por porção)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Calorias</p>
                    <p className="font-bold text-emerald-700">{selectedReceita.valorNutricional.calorias}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Proteínas</p>
                    <p className="font-bold text-emerald-700">{selectedReceita.valorNutricional.proteinas}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carboidratos</p>
                    <p className="font-bold text-emerald-700">{selectedReceita.valorNutricional.carboidratos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fibras</p>
                    <p className="font-bold text-emerald-700">{selectedReceita.valorNutricional.fibras}</p>
                  </div>
                </div>
              </div>

              {/* Ingredientes */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🛒 Ingredientes</h3>
                <ul className="space-y-2">
                  {selectedReceita.ingredientes.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modo de Preparo */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍🍳 Modo de Preparo</h3>
                <ol className="space-y-3">
                  {selectedReceita.modoPreparo.map((passo, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="font-bold text-green-600 flex-shrink-0">{i + 1}.</span>
                      <span>{passo}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Benefícios */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">✨ Benefícios</h3>
                <ul className="space-y-2">
                  {selectedReceita.beneficios.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
