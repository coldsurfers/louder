import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    AdminPage,
    NotFoundPage,
    EditorPage,
    PostsPage,
    AdminPostDetailPage,
    ListPage,
    LoginPage,
    RegisterPage,
    InfoPage,
    PostDetailPage,
    UsersPage,
    StaffRegisterPage,
    UserListPage,
    StaffManagePage
} from 'pages';
import Base from 'containers/Base';
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/:page?" component={ListPage}/>
                <Route exact path="/auth/login" component={LoginPage}/>
                <Route exact path="/auth/register" component={RegisterPage}/>
                <Route exact path="/auth/info" component={InfoPage}/>
                <Route path="/posts/:id" component={PostDetailPage}/>
                <Route exact path="/admin/home" component={AdminPage} />
                <Route exact path="/admin/users" component={UsersPage} />
                <Route exact path="/admin/editor" component={EditorPage} />
                <Route exact path="/admin/posts" component={PostsPage} />
                <Route exact path="/admin/users/register" component={StaffRegisterPage} />
                <Route exact path="/admin/users/member/:page?" component={UserListPage} />
                <Route exact path="/admin/users/staff/:page?" component={StaffManagePage} />
                <Route path="/admin/posts/:id" component={AdminPostDetailPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Base/>
        </div>
    );
};

export default App;