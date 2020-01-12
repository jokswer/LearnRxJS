type TResponse<T> = {
  response: Response;
  body: T;
};

type TSearchCompany = {
  symbol: string;
  company_full_name: string;
  exchange: string;
};

type TCompanyProfile = {
  symbol: string;
  profile: {
    price: number;
    beta: string;
    volAvg: string;
    mktCap: string;
    lastDiv: string;
    range: string;
    changes: number;
    changesPercentage: string;
    companyName: string;
    exchange: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    image: string;
  };
};
