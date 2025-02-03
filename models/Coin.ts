//나중에 추가하더라도 Coin 객체 형대로 수정
export class Coin {
  id: string;
  name: string;
  price: string;

  constructor(id: string, name: string, price: string) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
