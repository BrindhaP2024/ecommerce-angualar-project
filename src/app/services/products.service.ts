import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product, cart, order } from '../interfaces/data-type';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = 'http://localhost:3000/products';
  private ordersApiUrl = 'http://localhost:3000/orders';
  private cartApiUrl = 'http://localhost:3000/cart';

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post(this.productApiUrl, data);
  }

  productList() {
    return this.http.get<product[]>(this.productApiUrl);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productApiUrl}/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.productApiUrl}/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${this.productApiUrl}/${product.id}`, product);
  }

  // searchProduct(query: string): Observable<product[]> {
  //   return this.http.get<product[]>(`${this.productApiUrl}?q=${query}`);
  // }
  // searchProduct(query: string): Observable<product[]> {
  //   return this.http.get<product[]>(`${this.productApiUrl}?q=${query}`);
  // }
  // searchProduct(query: string): Observable<product[]> {
  //   console.log("API Call:", `${this.productApiUrl}?name_like=${query}`);
  //   return this.http.get<product[]>(`${this.productApiUrl}?name_like=${query}`);
  // }
  searchProduct(query: string): Observable<product[]> {
    const searchUrl = `${this.productApiUrl}?name_like=${query}`;
    console.log("API Call:", searchUrl);
    return this.http.get<product[]>(searchUrl);
  }

  localAddToCart(data: product) {
    let cartData: product[] = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(this.cartApiUrl, cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>(`${this.cartApiUrl}?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`${this.cartApiUrl}/${cartId}`);
  }

  currentCart(id?: any): Observable<cart[]> {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);

    if (userData && userData.id) {
      return this.http.get<cart[]>(`${this.cartApiUrl}?userId=${userData.id}`);
    } else {
      return of([]);
    }
  }

  orderNow(data: order) {
    return this.http.post(this.ordersApiUrl, data);
  }

  orderList(): Observable<order[]> {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);

    if (userData && userData.id) {
      return this.http.get<order[]>(`${this.ordersApiUrl}?userId=${userData.id}`).pipe(
        map(orders => {
          return orders.map(orderItem => ({
            ...orderItem,
            id: typeof orderItem.id === 'string' ? parseInt(orderItem.id, 10) : orderItem.id
          } as order));
        })
      );
    } else {
      return of([]);
    }
  }

  deleteCartItems(cartId: number | undefined) {
    if (cartId === undefined) {
      console.error("deleteCartItems called with undefined cartId");
      return;
    }

    this.http.delete(`${this.cartApiUrl}/${cartId}`).subscribe(() => {
      this.cartData.emit([]);
    });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.ordersApiUrl}/${orderId}`);
  }
}
