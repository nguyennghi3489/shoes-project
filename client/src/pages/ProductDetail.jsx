import React, { Component } from 'react';
// import ColorOptions from '../components/ColorOptions/ColorOptions.jsx';
// import SizeOptions from '../components/SizeOptions/SizeOptions.jsx';
import ProductItem from '../components/ProductItem/ProductItem.jsx';

const Header = () => (
    <div className='header'>
        <img src='/images/logo.png' />
    </div>
)
const Banner = () => (
    <div className='Banner-wrapper'>
        <div className='Banner'>
            <div className='top-banner'>
                <div className='content'>
                    <h1>Thương Hiệu Giầy Đến Từ USA</h1>
                    <p>Đảm bảo 100% tất cả các sản phẩm được nhập từ USA</p>
                    <button>Mua Hàng</button>
                </div>
            </div>
            <div className='bot-banner'>
            </div>
            <img src='/images/banner-shoes.png' />
        </div>
    </div>
)


// const ProductItem = (props, state) => {

//     const changeMainImage = (item) => {
//         console.log(item)
//         state = {mainImage : 'images/kobe-ad-basketball-shoe_1.jpg'}
//     }
//     console.log(state);
//     const thumbnails = ['images/kobe-ad-basketball-shoe.jpg',
//                         'images/kobe-ad-basketball-shoe_1.jpg',
//                         'images/kobe-ad-basketball-shoe_2.jpg',
//                         'images/kobe-ad-basketball-shoe_3.jpg',
//                         'images/kobe-ad-basketball-shoe_4.jpg',
//                         'images/kobe-ad-basketball-shoe_5.jpg' ];
//     state = {mainImage: thumbnails[0]};

//     // this.setState({mainImage : thumbnails[0]})


//     return (<div className='product-item'>
//         <img className='logo' src='images/nike.png' />
//         <div className='thumbnails'>
//             <Thumbnails thumbnails={thumbnails} changeMainImage={changeMainImage} />
//         </div>
//         <div className="row">
//             <div className='large-8 columns image-wrapper'>
//                 <img src={state.mainImage} />
//                 <div>
//                     {/*<img className='duplicate-style' src='images/kobe-ad-basketball-shoe.jpg' />*/}
//                 </div>
//             </div>
//             <div className='large-4 columns info-wrapper'>
//                 <h4>Kobe A.D</h4>
//                 <p><i>BASKETBALL SHOE</i></p>
//                 <p className='price'>180$</p>
//                 <ColorOptions />
//                 <SizeOptions />
//                 <button>ADD TO CART</button>
//             </div>
//         </div>
//     </div>)
// }



class Landing extends Component {

    productList = [{
        id: 'NIKE01',
        brand:'nike',
        title: 'Kobe A.D',
        subTitle: 'BASKETBALL SHOE',
        price: 180,
        colors: ['red', 'blue'],
        sizes: [8, 9, 10, 11, 12],
        thumbnails: {
            red:['images/kobe-ad-basketball-shoe.jpg',
            'images/kobe-ad-basketball-shoe_1.jpg',
            'images/kobe-ad-basketball-shoe_2.jpg',
            'images/kobe-ad-basketball-shoe_3.jpg',
            'images/kobe-ad-basketball-shoe_4.jpg',
            'images/kobe-ad-basketball-shoe_5.jpg'],
            blue:['images/kobe-mamba-instinct-mens-basketball-shoe.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_1.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_2.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_3.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_4.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_5.jpg']
        }
    },
    {
        brand:'nike',
        title: 'NIKE KOBE MAMBA INSTINCT',
        subTitle: 'MEN\'S BASKETBALL SHOE',
        price: 79.97,
        colors: ['red'],
        sizes: [8, 9, 10, 11, 12],
        thumbnails: { red: ['images/kobe-mamba-instinct-mens-basketball-shoe.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_1.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_2.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_3.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_4.jpg',
            'images/kobe-mamba-instinct-mens-basketball-shoe_5.jpg']
        }
    }

    // },
    // {
    //     brand:'nike',
    //     title: 'AIR JORDAN 4 RETRO',
    //     subTitle: 'MEN\'S SHOE',
    //     price: 154.97,
    //     colors: ['red', 'blue'],
    //     sizes: [8, 9, 10, 11, 12],
    //     thumbnails: ['images/air-jordan-4-retro-mens-shoe.jpg',
    //         'images/air-jordan-4-retro-mens-shoe_1.jpg',
    //         'images/air-jordan-4-retro-mens-shoe_2.jpg',
    //         'images/air-jordan-4-retro-mens-shoe_3.jpg',
    //         'images/air-jordan-4-retro-mens-shoe_4.jpg',
    //         'images/air-jordan-4-retro-mens-shoe_5.jpg']
    // },
    // {
    //     brand:'adidas',
    //     title: 'NMD_R2 SHOES',
    //     subTitle: 'MEN\'S ORIGINALS',
    //     price: 130,
    //     colors: ['red', 'blue'],
    //     sizes: [8, 9, 10, 11, 12],
    //     thumbnails: ['images/BY3014_01_standard.jpg',
    //         'images/BY3014_02_standard.jpg',
    //         'images/BY3014_03_standard.jpg',
    //         'images/BY3014_04_standard.jpg',
    //         'images/BY3014_05_standard.jpg']
    // }
    ]

    componentWillAmount() {

    }
    render() {
        return (
            <div className="opening">
                <div className="row product-list">
                    {this.productList.map((item, index) => (
                        <div key={index} className="large-12 columns">
                            <ProductItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Landing;
