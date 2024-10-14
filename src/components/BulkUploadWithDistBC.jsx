//BulkUploadWithDistBC stands for Bulk Upload With District, Block & School.
// This component will allow user to reigster students in bulk after selecting District, block and school.

import React, {useState} from 'react';

import DependentDropComponent from './DependentDropComponent';
import BulkUpload from './BulkUpload';
import BulkUploadTemplate from './BulkUploadTemplate';


export default function BulkUploadWithDistBC () {

    const [district, setDistrict] = useState('');
    const [block , setBlock] = useState('');
    const [school , setSchool] =  useState('');


    return (
        <div>
            <div>
                <DependentDropComponent
                setDistrict={setDistrict}
                setBlock={setBlock}
                setSchool={setSchool}
                />
                <br/>
            </div>

{(district && block && school) ? (
    <div>
        <BulkUpload/>

    
        <BulkUploadTemplate //passing the values of distric, block, school as a props from here to the BulkUploadTemplate. For prefilled of district, block, school functionality.
        district={district}
        block = {block}
        school = {school}
        />
    </div>
): null}

        </div>

    );

}