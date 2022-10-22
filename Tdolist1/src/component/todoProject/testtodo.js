import React, {useState, useEffect} from 'react';
import "../../App.css";


const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};

const Testtodo = () => {

    const [inputData, setInputData] = useState('');

    const [items, setItems] = useState(getLocalItems());

    const [toogleSubmit, setToggleSubmit] = useState(true);

    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plz fill the data');
        }
        else if (inputData && !toogleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        console.log('I am matched ');
                        return { ...elem, name:inputData };
                    }
                    return elem;
                })
            );

            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString() , name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
        
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((elem) => {
            return elem.id !== id;
        })
        setItems(updatedItems);
    }
    
    const editItem = (id) => {

        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        console.log(newEditItem.name);

        setToggleSubmit(false);

        setInputData(newEditItem.name);
        console.log("my new input name is" + inputData);
        setIsEditItem(id);

    }

    const remvoveAll = () => {
        setItems([]);
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);

    return (
       <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <figcaption>Add your list here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" className="form-control" placeholder="Add item..."
                            value={inputData }
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        { toogleSubmit ? <i className="fa fa-plus add-btn" title="Add item" onClick={() => addItem()}></i> :  <i className="far fa-edit add-btn" title="Edit item" onClick={addItem}></i> }
                        
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3> {elem.name} </h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" target="_blank" onClick={remvoveAll}><span>Clear All </span></button>
                    </div>

                </div>
         </div>   
      </>
    )
}

export default Testtodo
