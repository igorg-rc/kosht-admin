import { ThemeProvider, createTheme } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from './components/UI/Layout'
import { IndexMain } from './pages/IndexMain'

import { PostIndex } from './components/Post/PostIndex'
import { PostCreate } from './components/Post/PostCreate'
import { PostEdit } from './components/Post/PostEdit'

import { CategoryIndex } from './components/Category/CategoryIndex'
import { CategoryCreate } from './components/Category/CategoryCreate'
import { CategoryEdit } from './components/Category/CategoryEdit'
import { TagIndex } from './components/Tag/TagIndex'
import { TagEdit } from './components/Tag/TagEdit'
import { TagCreate } from './components/Tag/TagCreate'
import { ContactIndex } from './components/Contact/ContactIndex'
import { ContactEdit } from './components/Contact/ContactEdit'
import { ContactCreate } from './components/Contact/ContactCreate'
import { BannerIndex } from './components/Banner/BannerIndex'
import { BannerEdit } from './components/Banner/BannerEdit'
import { BannerCreate } from './components/Banner/BannerCreate'
import { SubscriberIndex } from './components/Subscriber/SubscriberIndex'

import { Suspense } from 'react'

const adminTheme = createTheme({
  palette: {
    secondary: {
      main: '#333333'
    }
  }
})


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="App">
        <ThemeProvider theme={adminTheme}>
          <Router>
            <Layout>
              <Switch>
                <Route path="/" exact component={IndexMain} />  
                <Route path="/banners/create" component={BannerCreate} />
                <Route path="/banners/:id" component={BannerEdit} />
                <Route path="/banners" component={BannerIndex} />
                <Route path="/posts/create" component={PostCreate} />
                <Route path="/posts/:postId" component={PostEdit} />
                <Route path="/posts" component={PostIndex} />
                <Route path="/categories/create" component={CategoryCreate} />
                <Route path="/categories/:id" component={CategoryEdit} />
                <Route path="/categories" component={CategoryIndex} />
                <Route path="/tags/create" component={TagCreate} />
                <Route path="/tags/:id" component={TagEdit} />
                <Route path="/tags" component={TagIndex} />
                <Route path="/contacts/create" component={ContactCreate} />
                <Route path="/contacts/:id" component={ContactEdit} />
                <Route path="/contacts" component={ContactIndex} />
                <Route path="/subscribers" component={SubscriberIndex} />
              </Switch>
            </Layout>
          </Router>
        </ThemeProvider>
      </div>
    </Suspense>
  )
}

export default App