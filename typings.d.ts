

type IBanner = {
    _createdAt: Date;
    _id:        string;
    _rev:       string;
    _type:      string;
    _updatedAt: Date;
    buttonText: string;
    desc:       string;
    discount:   string;
    image:      Image;
    largeText1: string;
    largeText2: string;
    midText:    string;
    product:    string;
    saleTime:   string;
    smallText:  string;
  }
  

  
type Asset = {
    _ref:  string;
    _type: string;
  }
  
  type IProduct = {
    _createdAt: Date;
    _id:        string;
    _rev:       string;
    _type:      string;
    _updatedAt: Date;
    details:    string;
    image:      Image[];
    name:       string;
    price:      number;
    slug:       Slug;
}

type Image = {
    _key?:  string;
    _type: string;
    asset: Asset;
  }

  type Slug = {
    _type:   string;
    current: string;
}
