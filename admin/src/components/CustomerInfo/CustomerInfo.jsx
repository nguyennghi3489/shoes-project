import React, { Component } from 'react';
import moment from 'moment';
import './CustomerInfo.scss'
var PieChart = require("react-chartjs").Pie;
var DoughnutChart = require("react-chartjs").Doughnut;
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;

const dateFormat = data => moment(data).format('hh:mm / DD MMMM YYYY')



class CustomerInfo extends Component {
    
    componentWillMount() {
    }

    setUpHistoryData(item) {
        const dateList = item.map(item => dateFormat(item.created_at));
        const data = item.map(item => item.totalPrice);

        return {
            labels: dateList,
            datasets: [{
                label: '# of Votes',
                data: data,
                fillColor:
                "rgba(220,220,220,0.2)",
                borderWidth: 1
            }]
        }
    }
    setUpData(item) {
        if(item) {
            return [{
                color:"#F7464A",
                highlight:"#FF5A5E",
                label:"Debt",
                value: item.totalPrice - item.payedMoney
            },
            {
                color:"#4dd76a",
                highlight:"#4dd76a",
                label:"Payed",
                value:item.payedMoney
            }]
        }
        return [];
    }

    render() {
        const options = {
            responsive: true,
            circumference : 0
          };
        const { customer, customerOrders, customerProfit } = this.props
        return (
            <div className='customer-info'>
                <div className="small-3 columns">
                    <h4>Basic Info</h4>
                    <p>Name : <b>{customer.name}</b></p>
                    <p>Phone : <i>{customer.phone}</i></p>
                </div>

                <div className="small-4 columns">
                    <h4>Profit</h4>
                    { customerProfit && customerProfit.length > 0 ? <div><DoughnutChart options={options} data={this.setUpData(customerProfit[0])}/></div> : <div>There is no any transfer yet</div>
                }
                </div>

                <div className="small-5 columns"> 
                    <h4>Trade History</h4>
                    {customerOrders && customerOrders.length > 0 ? <table className="hover">
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Payed</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                            <tbody>
                        {customerOrders.map((item,index) => <tr>
                            <td>{index}</td>
                            <td>{item.payedMoney}</td>
                            <td>{item.totalPrice}</td>
                            <td>{dateFormat(item.created_at)}</td>
                        </tr>)}
                        </tbody>
                    </table> : <div>There is no any transfer yet</div>}
                </div>
                <div>
                    { customerOrders && customerOrders.length > 1 && <LineChart height={50} data={this.setUpHistoryData(customerOrders)} options={options} /> }
                </div>
            </div>
        )
    }
}

export default CustomerInfo