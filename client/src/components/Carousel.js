import React from 'react';
import { useSelector } from 'react-redux';

const Carousel = ({images, id}) => {
    const isActive = index => {
        if(index === 0) return 'active';
    } 
    const {theme} = useSelector(state=>state);
    return (
            <div id={`image${id}`} className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators" style={{filter: theme?'invert(1)':'invert(1)'}}>
                    {
                        images.map((img,index) => (
                            <li key={index} data-target={`#image${id}`} data-slide-to={index} className={isActive(index)} />
                        ))
                    }
                </ol>
                <div className="carousel-inner">
                    {
                        images.map((img,index)=>(
                            <div key={index} className={`carousel-item ${isActive(index)}`}>
                                {
                                    img.url.match(/video/i) ? <video controls className="d-block w-100" src={img.url} alt={img.url} style={{filter: theme?'invert(1)':'invert(0)'}}/>  : <img className="d-block w-100" src={img.url} alt={img.url} style={{filter: theme?'invert(1)':'invert(0)'}}/>
                                }
                                
                            </div>
                        ))
                    }
                    
                </div>
                
                {
                    images.length > 1 && 
                    <React.Fragment>
                        <a className="carousel-control-prev" href={`#image${id}`} role="button" data-slide="prev" style={{filter: theme ?'invert(1)':'invert(0)', width: '5%'}}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href={`#image${id}`} role="button" data-slide="next" style={{filter: theme?'invert(1)':'invert(0)', width: '5%'}}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </React.Fragment>
                     
                }
                
            </div>
    )
}

export default Carousel;