import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import LecturersAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import { CRow, CCol, CCardImage, CCardTitle, CCardText, CButton } from '@coreui/react';
import { userApi } from './../../api/userApi';
import { useSelector } from 'react-redux';

const Lecturers = () => {
	const [listPost, setListPost] = useState([]);
	const searchLecturers = useSelector((state) => state.blogReducers.search);

	const getListPost = async () => {
		try {
			const response = await userApi.getAllExpert();
			console.log(response);
			setListPost(response.data.filter(res => res.user?.fullname.toLowerCase().includes(searchLecturers.toLowerCase())));
		} catch (responseError) {
			console.log(responseError);
		}
	};

	useEffect(() => {
		getListPost();
		// eslint-disable-next-line
	}, [searchLecturers]);

	return (
		<>
			<Header />
			<div className="page-content">
				<div className="page-banner ovbl-dark" style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}>
					<div className="container">
						<div className="page-banner-entry">
							<h1 className="text-white">Lecturers Classic Sidebar</h1>
						</div>
					</div>
				</div>
				<div className="breadcrumb-row">
					<div className="container">
						<ul className="list-inline">
							<li><Link to="/">Home</Link></li>
							<li>Lecturers Classic Sidebar</li>
						</ul>
					</div>
				</div>
				<div className="content-block">
					<div className="section-area" style={{ marginTop: "20px" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-3 col-xl-3 col-md-5 sticky-top">
									<LecturersAside />
								</div>
								<div className="col-lg-9 col-xl-9 col-md-7">
									<CRow className="g-0">
										{
											listPost.map((item) => (
												<CRow key={item?.id}>
													<CCol md={3}>
														<CCardImage src={process.env.REACT_APP_BASE_URL + "/api/account/downloadFile/" + item?.user.avatar} />
													</CCol>
													<CCol md={9}>
														<CCardTitle >
															<Link to={`/blog/${item?.id}`}>{item?.user?.fullname}</Link>
														</CCardTitle>
														<CCardText >{item?.jobTitle}</CCardText>
														<CButton><Link to={`/lecturers/${item?.id}`}>Read more</Link></CButton>
													</CCol>
													<hr />
												</CRow>
											))
										}
									</CRow>
									{
										listPost.length !== 0
											? (<><div className="pagination-bx rounded-sm gray m-b30 clearfix">
												<ul className="pagination">
													<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link >1</Link></li>
													<li><Link >2</Link></li>
													<li><Link >3</Link></li>
													<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
												</ul>
											</div></>)
											: (<h5 style={{ marginLeft: '50px' }}>Can't find any lecturers</h5>)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Lecturers;