import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import BackToTop from "./elements/back-top";
import PageScrollTop from "./elements/page-scroll-top";
import Index2 from "./pages/index-2";
import About2 from "./pages/about-2";
import Faq2 from "./pages/faq-2";
import Error404 from "./pages/error-404";
import ForgetPassword from "./pages/forget-password";
import Login from "./pages/login";
import Membership from "./pages/membership";
import Portfolio from "./pages/portfolio";
import Profile from "./pages/profile";
import Register from "./pages/register";
import ProductsUser from "./pages/courses";
import CoursesDetails from "./pages/courses-details";
import LecturersUser from "./pages/lecturers";
import BlogClassicSidebar from "./pages/blog-classic-sidebar";
import BlogDetails from "./pages/blog-details";
import Contact1 from "./pages/contact-1";
import ForgetPasswordInput from "./pages/forget-password-input";
import Dashboard from "../admin/views/dashboard/Dashboard";
import UserDetail from "../admin/views/users/UserDetail";
import Users from "../admin/views/users/Users";
import Cookies from "js-cookie";
import Class from "../admin/views/class/class";
import ClassDetail from "../admin/views/class/class-detail";
import Coupon from "../admin/views/coupon/coupon";
import CouponDetail from "../admin/views/coupon/coupon-detail";
import Trainee from "../admin/views/trainee/trainee";
import TraineeDetail from "../admin/views/trainee/trainee-detail";
import Combo from "../admin/views/combo/Combo";
import ComboDetail from "../admin/views/combo/ComboDetail";
import Contact from "../admin/views/contact/contact";
import ContactDetail from "../admin/views/contact/contact-detail";
import ExpertDetail from "../admin/views/expert/ExpertDetail";
import Experts from "../admin/views/expert/Experts";
import PostDetail from "../admin/views/posts/PostDetail";
import Posts from "../admin/views/posts/Posts";
import PackageDetail from "../admin/views/packages/PackageDetail";
import SettingDetail from "../admin/views/settings/SettingDetail";
import Settings from "../admin/views/settings/Settings";
import Sliders from "../admin/views/sliders/Sliders";
import SubjectDetail from "../admin/views/subjects/subject-detail";
import Subjects from "../admin/views/subjects/subjects";
import RegistrationDetail from "../admin/views/registration/registration-detail";
import Registration from "../admin/views/registration/registration";
import OrderedDetail from "../admin/views/ordered/ordered-detail";
import Ordered from "../admin/views/ordered/ordered";
import OrdersDetail from "../admin/views/orders/orders-detail";
import Orders from "../admin/views/orders/orders";
import Packages from "./../admin/views/packages/Packages";
import SliderDetail from "./../admin/views/sliders/SliderDetail";
import ComboHome from "./pages/combo";
import ClassUser from "./pages/Class";
import ComboDetailHome from "./pages/ComboDetails";
import ExpertsUser from "./pages/Expert";
import Error401 from "./pages/error-401";
import ClassUserDetails from "./pages/ClassUserDetails";
import LecturerDetails from "./pages/LecturerDetails";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoReduce } from "../redux/reducers/auth";
import Cart from "./pages/Cart";
import CheckOut from "./pages/Checkout";
import { getAllCartLocal } from "../redux/reducers/order";

function Markup(props) {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserInfoReduce());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin) {
      dispatch(getAllCartLocal());
    }
    // eslint-disable-next-line
  }, [isLogin, dispatch]);

  return (
    <>
      <BrowserRouter basename={"/react/"}>
        <Switch>
          {/* Home Pages */}
          <Route path="/" exact component={Index2} />

          {/* About Us */}
          <Route path="/about" exact component={About2} />

          {/* Events */}
          {/* <Route path="/events" exact component={Events} />
                        <Route
                            path="/events-details"
                            exact
                            component={EventsDetails}
                        /> */}

          {/* Faq */}
          <Route path="/faq" exact component={Faq2} />

          {/* Other Pages */}
          <Route path="/portfolio" exact component={Portfolio} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/membership" exact component={Membership} />
          <Route path="/error-404" exact component={Error404} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/forget-password" exact component={ForgetPassword} />
          <Route
            path="/reset-password/:token"
            exact
            component={ForgetPasswordInput}
          />
          <Route path="/profile" exact component={Profile} />

          {/* Courses */}
          <Route path="/products" exact component={ProductsUser} />
          <Route path="/lecturers" exact component={LecturersUser} />
          <Route path="/courses-details/:id" exact component={CoursesDetails} />

          {/* expert */}
          <Route path="/expert" exact component={ExpertsUser} />
          <Route path="/lecturers" exact component={LecturersUser} />
          <Route path="/lecturers/:id" exact component={LecturerDetails} />

          {/* Combos */}
          <Route path="/combo" exact component={ComboHome} />
          <Route path="/combo/:id" exact component={ComboDetailHome} />

          {/* class */}
          <Route path="/class" exact component={ClassUser} />
          <Route path="/class/:id" exact component={ClassUserDetails} />

          {/* Blog Pages */}
          <Route path="/blog" exact component={BlogClassicSidebar} />
          <Route path="/blog/:id" exact component={BlogDetails} />

          {/* Contact Us */}
          <Route path="/contact-us" exact component={Contact1} />
          {/* Contact Us */}
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={CheckOut} />

          {/* admin  */}
          <PrivateRoute path="/admin/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/admin/users" exact>
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/admin/users/:username" exact>
            <UserDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/contacts" exact>
            <Contact />
          </PrivateRoute>
          <PrivateRoute path="/admin/contacts/:username" exact>
            <ContactDetail />
          </PrivateRoute>

          {/* Subject */}
          <PrivateRoute path="/admin/subjects" exact>
            <Subjects />
          </PrivateRoute>
          <PrivateRoute path="/admin/subjects/:id" exact>
            <SubjectDetail />
          </PrivateRoute>

          {/* Registration */}
          <PrivateRoute path="/admin/registration" exact>
            <Registration />
          </PrivateRoute>
          <PrivateRoute path="/admin/registration/:id" exact>
            <RegistrationDetail />
          </PrivateRoute>

          {/* Orders */}
          <PrivateRoute path="/admin/orders" exact>
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/admin/orders/:id" exact>
            <OrdersDetail />
          </PrivateRoute>

          {/* Ordered */}
          <PrivateRoute path="/admin/ordered" exact>
            <Ordered />
          </PrivateRoute>
          <PrivateRoute path="/admin/ordered/:id" exact>
            <OrderedDetail />
          </PrivateRoute>

          {/* Class */}
          <PrivateRoute path="/admin/class" exact>
            <Class />
          </PrivateRoute>
          <PrivateRoute path="/admin/class/:id" exact>
            <ClassDetail />
          </PrivateRoute>

          {/* Trainee */}
          <PrivateRoute path="/admin/trainee" exact>
            <Trainee />
          </PrivateRoute>
          <PrivateRoute path="/admin/trainee/:id" exact>
            <TraineeDetail />
          </PrivateRoute>

          {/* Coupon */}
          <PrivateRoute path="/admin/coupon" exact>
            <Coupon />
          </PrivateRoute>
          <PrivateRoute path="/admin/coupon/:id" exact>
            <CouponDetail />
          </PrivateRoute>

          {/* Expert */}
          <PrivateRoute path="/admin/experts" exact>
            <Experts />
          </PrivateRoute>
          <PrivateRoute path="/admin/experts/:id" exact>
            <ExpertDetail />
          </PrivateRoute>

          {/* Post */}
          <PrivateRoute path="/admin/posts" exact>
            <Posts />
          </PrivateRoute>
          <PrivateRoute path="/admin/posts/create" exact>
            <PostDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/posts/:id" exact>
            <PostDetail />
          </PrivateRoute>

          {/* Slider */}
          <PrivateRoute path="/admin/sliders" exact>
            <Sliders />
          </PrivateRoute>
          <PrivateRoute path="/admin/sliders/create" exact>
            <SliderDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/sliders/:id" exact>
            <SliderDetail />
          </PrivateRoute>

          {/* Product */}
          <PrivateRoute path="/admin/packages" exact>
            <Packages />
          </PrivateRoute>
          <PrivateRoute path="/admin/packages/create" exact>
            <PackageDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/packages/:id" exact>
            <PackageDetail />
          </PrivateRoute>

          {/* Combo */}
          <PrivateRoute path="/admin/combos" exact>
            <Combo />
          </PrivateRoute>
          <PrivateRoute path="/admin/combos/create" exact>
            <ComboDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/combos/:id" exact>
            <ComboDetail />
          </PrivateRoute>

          {/* Settings */}
          <PrivateRoute path="/admin/settings" exact>
            <Settings />
          </PrivateRoute>
          <PrivateRoute path="/admin/settings/create" exact>
            <SettingDetail />
          </PrivateRoute>
          <PrivateRoute path="/admin/settings/:id" exact>
            <SettingDetail />
          </PrivateRoute>

          <Route path="/error-401" exact component={Error401} />
        </Switch>

        <PageScrollTop />
      </BrowserRouter>

      <BackToTop />
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = false;
  if (Cookies.get("roles") === "ROLE_ADMIN") isAuthenticated = true;
  else {
    if (
      rest?.path?.includes("contact") &&
      Cookies.get("roles") === "ROLE_SUPPORTER"
    )
      isAuthenticated = true;
    else if (
      rest?.path?.includes("subjects") &&
      Cookies.get("roles") === "ROLE_MANAGER"
    )
      isAuthenticated = true;
    else if (
      rest?.path?.includes("class") &&
      (Cookies.get("roles") === "ROLE_MANAGER" ||
        Cookies.get("roles") === "ROLE_TRAINER")
    )
      isAuthenticated = true;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/error-401",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Markup;
