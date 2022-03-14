import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
 
  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {/* {transactions.map(transaction => { Dá prá fazer assim
            return (
              <tr>
              <td>Desenvolvimento de website</td>
              <td className="deposit">R$12.000</td>
              <td>Desenvolvimento</td>
              <td>20/02/2021</td>
            </tr> ou...
            );
          })} */}
          {transactions.map( transaction => (
            <tr key={transaction.id}>
            <td>{transaction.title}</td>
            <td className={transaction.type}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount)}
            </td>  
            <td>{transaction.category}</td>

            <td>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(transaction.createdAt)
              )}
              </td>
          </tr>
          ))}

          
        </tbody>
      </table>
    </Container>
  );
}