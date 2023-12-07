import React, { useEffect, useState } from 'react'
import Search from '../components/common/Search'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import LinkButton from '../components/common/LinkButton'
import Filter from '../components/common/Filter'
import SectionHeader from '../components/common/SectionHeader'
import instance from '../components/auth/axiosConfig'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router'
import EmptyMessage from '../components/common/EmptyMessage'


const ArtsCollection = () => {

    const [arts, setArts] = useState([])

    // let artsList = [
    //     {
    //         image:  "https://previews.123rf.com/images/alfazetchronicles/alfazetchronicles2306/alfazetchronicles230626692/207297608-abstract-colorful-projection-on-a-wall-created-with-generative-ai.jpg",
    //         name:"Modern Art",
    //         category:"mordern",
    //         author:"Mary Sue",
    //         price:"",
    //         live:false

    //     },
    //     {
    //         image:  "https://previews.123rf.com/images/julianpetersphotography/julianpetersphotography1611/julianpetersphotography161100097/65909520-bogota-colombia-on-december-15-2015-collage-of-street-art-by-various-artists-including-toximano.jpg",
    //         name:"Graffiti",
    //         category:"modern",
    //         author:"Bob Jack",
    //         price:"",
    //         live:false
    //     },
    //     {
    //         image:  "https://www.artnews.com/wp-content/uploads/2020/02/10550689a.jpg",
    //         name:"Man",
    //         category:"history",
    //         author:"Andy Schmidt",
    //         price:"",
    //         live:false
    //     },
    //     {
    //         image: "https://thinkspaceprojects.com/wp-content/uploads/2021/06/wileywallace2021.jpg",
    //         name:"Royal",
    //         category:"royal",
    //         author:"Helena Royal",
    //         price:"",
    //         live:false
    //     },
    //     {
    //         image: "https://www.onart.media/wp-content/uploads/2021/09/Mariam-Abouzid-Souali-Un-mariage-en-automne-2020-Avenir-commun-Les-chemins-des-indesirables-Distance-ardente-au-MRAC-a-Serignan-01-1.jpg",
    //         name:"Bridal Image",
    //         category:"contemporary",
    //         author:"John doe",
    //         price:"",
    //         live:false
    //     },

    //     {
    //         image: "https://giftshopnexus.com/cdn/shop/products/AfricanArtOriginalOneofaKindCanvasWallArtColorfulAfricanArtAfricanModernArtContemporaryLivingRoomArtfromSouthernAfrica._1.png?v=1650402845&width=1445",
    //         name:"Ancient",
    //         category:"contemporary",
    //         author:"Mary Comb",
    //         price:"",
    //         live:false
    //     },
    //     {
    //         image:"https://res.cloudinary.com/simpleview/image/upload/v1645719605/clients/discoverlehighvalley/AllentownArtMuseum_Gallery01_DiscoverLehighValley_2450c76f-4de5-402c-a060-d0a8ff3b1d37.jpg",
    //         name:"Domestic",
    //         category:"history",
    //         author:"Mary Comb",
    //         price:"",
    //         live:false
    //     },
    //     {
    //         image:"https://ih3.redbubble.net/image.7252038.8868/flat,550x550,075,t.jpg",
    //         name:"Girl",
    //         category:"modern",
    //         author:"Sue Heck",
    //         price:"",
    //         live:false

    //     }
       
    // ]

    const [filteredList, setFilteredList] = useState([])
    const [list, setList] = useState([])
    
    

    useEffect(()=>{
        setList(filteredList)
    },[filteredList])

    useEffect(()=>{
        setList(filteredList?.length===0?arts:filteredList)
    },[arts])

    
    useEffect(()=>{
        instance.get('/Artwork')
        .then((res)=>{
            // setSuccess(true)
            if(res?.status===200){
                setArts(res?.data)
               console.log(res)
            }
          
            
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const navigate = useNavigate()

    console.log(arts)
    console.log(filteredList)

  return (
    <>
        <div className='container-fluid p-4 '>
            <div className='row'>

                <div className='col-lg-3 col-md-4 col-sm-4'>
                    <div className='browse-left vh-100 position-fixed border-end pe-4'>
                        <div className='search'>
                            <Search list={arts} setFilteredList={setFilteredList}/>
                            {/* <Search /> */}
                        </div>
                        <div className='filter mt-4 h-100  d-flex flex-column  align-items-start'>
                            <Filter list={list} setFilteredList={setFilteredList} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-9 col-md-8 col-sm-8'>
                    <SectionHeader label="Our Arts Collection"/>
                <div className='browse-right w-100'>

                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                        gutter="10px"
                    >
                        <Masonry>
                        {
                        list?.length>0?
                        list?.map((list, index)=>{
                            console.log(list)
                            return (
                                <>
                                <div class="item hovereffect" >
                                    
                                    <img src= {list?.imageUrl} style={{width: "100%", display: "block", padding:"7px"}} />
                                    <div class="overlay">
                                        <h2>{list?.title}</h2>
                                        <p>
                                        <Button text="Show More" color="black" textColor="white"  className="me-3" onClick={()=>navigate(`/art-detail/${list?.id}`, {state:list?.id})}/>

                                            
                                            {/* <LinkButton color="white" textColor="black" text="Show More" link={`/art-detail/${list?.id}`} id={'id'}>Show More</LinkButton> */}
                                        </p>
                                    </div>
                                </div>
            </>
        )
      
    })
    :
    <EmptyMessage title="arts" className=""/>
    // <p>Sorry, there are no matching items</p>
}

                        </Masonry>
                    </ResponsiveMasonry>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ArtsCollection