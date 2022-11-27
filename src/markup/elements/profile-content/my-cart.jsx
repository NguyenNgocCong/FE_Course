import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { useDispatch, useSelector } from 'react-redux';
import { combieImg } from '../../../utils';
import { removeCartCombo, removeCartPackage } from "../../../redux/reducers/order";

const FilterList = ({ dataFilter, defaultTag, activeFilter }) => {
	return (
		<li className={`${activeFilter ? 'btn active' : 'btn'}`} onClick={() => defaultTag(dataFilter)} >
			<Link to={"#"}>{dataFilter}</Link>
		</li>
	);
};

function CartContent() {
	const [tag, setTag] = useState('All');
	const { data } = useSelector((state) => state.order);
	const { packages, combos } = data;
	const dispatch = useDispatch();
	const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
	const totalCombo = [...combos].reduce(
		(pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
		0
	);

	useEffect(() => {
	}, [tag])

	return (
		<>
			<div className="profile-head">
				<h5>My Cart</h5>
				<div className="feature-filters style1 ml-auto">
					<ul className="filters" data-toggle="buttons">
						<FilterList
							dataFilter="All"
							defaultTag={setTag}
							activeFilter={tag === 'all' ? true : false}
						/>
						<FilterList
							dataFilter="Combo"
							defaultTag={setTag}
							activeFilter={tag === 'combo' ? true : false}
						/>
						<FilterList
							dataFilter="Courses"
							defaultTag={setTag}
							activeFilter={tag === 'courses' ? true : false}
						/>
					</ul>
				</div>
			</div>
			<div className="courses-filter">
				<Masonry>
					<div className="table-responsive">
						<table className="table-bordered">
							<thead>
								<tr>
									<th
										className="text-center py-3 px-4"
										style={{ maxWidth: "400px" }}
									>
										package Name &amp; Details
									</th>
									<th
										className="text-center py-3 px-4"
										style={{ minWidth: "100px" }}
									>
										Price
									</th>
									<th
										className="text-center align-middle py-3 px-0 px-4"
										style={{ width: "40px" }}
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{[...packages].map((x) => (
									<tr>
										<td>
											<div className="media align-items-center">
												<img
													style={{ maxHeight: "50px" }}
													src={combieImg(x.image)}
													className="d-block ui-w-40 ui-bordered mr-4"
													alt=""
													width={100}
													onError={({ currentTarget }) => {
														currentTarget.src =
															"http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
													}}
												/>
												<div className="media-body">
													{x.title}
												</div>
											</div>
										</td>
										<td className="text-right font-weight-semibold align-middle p-4">
											${x.salePrice}
										</td>
										<td className="text-center align-middle px-0">
											<button
												className="shop-tooltip close float-none text-danger"
												title=""
												data-original-title="Remove"
												onClick={() => dispatch(removeCartPackage(x.id))}
											>
												×
											</button>
										</td>
									</tr>
								))}
								{[...combos].map((x) => (
									<tr>
										<td >
											<div className="media align-items-center">
												<img
													src={combieImg(x.image)}
													className="d-block ui-w-40 ui-bordered mr-4"
													alt=""
													width={100}
													onError={({ currentTarget }) => {
														currentTarget.src =
															"http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
													}}
												/>
												<div className="media-body">
													{x.title}
												</div>
											</div>
										</td>
										<td className="text-right font-weight-semibold align-middle p-4">
											$
											{x.comboPackages.reduce(
												(pre, x) => pre + x.salePrice,
												0
											)}
										</td>
										<td className="text-center align-middle px-0">
											<button
												className="shop-tooltip close float-none text-danger"
												title=""
												data-original-title="Remove"
												onClick={() => dispatch(removeCartCombo(x.id))}
											>
												×
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="d-flex flex-wrap align-items-center float-right" style={{ marginBottom: "15px" }}>
							<div className="d-flex" style={{ marginRight: "5px" }}>
								Total price:
							</div>
							<div className="text-right " style={{ marginRight: "10px" }}>
								<div className="text-large">
									<strong>${totalCombo + totalPackage}</strong>
								</div>
							</div>
							<Link
								role={"button"}
								to="checkout"
								type="button"
								className="btn btn-ms btn-warning mt-2"
							>
								Checkout
							</Link>
						</div>
					</div>
				</Masonry>
			</div>
		</>

	);
}

class Cart extends Component {
	render() {
		return (
			<>
				<CartContent />
			</>
		);
	}
}

export default Cart;