// // Create the form page content for /src/app/seafarer-application/page.jsx

// //form_page_code = """
// 'use client';

// import { useState } from 'react';

// export default function SeafarerApplicationForm() {
//   const [formData, setFormData] = useState({
//     company: '',
//     formType: '',
//     fullName: '',
//     dob: '',
//     pob: '',
//     nationality: '',
//     email: '',
//     phone: '',
//     address: '',
//     rank: '',
//     passportNo: '',
//     passportIssue: '',
//     passportExpiry: '',
//     height: '',
//     weight: '',
//     shoeSize: '',
//     education: '',
//     license: '',
//     licenseIssue: '',
//     licenseExpiry: '',
//     nextOfKin: '',
//     family: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/application/submit', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     alert(data.message || 'Submitted');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Seafarer Application Form</h2>

//       <label>Company</label>
//       <select name="company" onChange={handleChange} className="w-full border p-2 rounded">
//         <option value="">Select</option>
//         <option value="DD">DD</option>
//         <option value="KN">KN</option>
//       </select>

//       <label>Form Type</label>
//       <select name="formType" onChange={handleChange} className="w-full border p-2 rounded">
//         <option value="">Select</option>
//         <option value="officer">Officer</option>
//         <option value="crew">Crew</option>
//       </select>

//       <label>Full Name</label>
//       <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" />

//       <label>Date of Birth</label>
//       <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" />

//       <label>Place of Birth</label>
//       <input type="text" name="pob" value={formData.pob} onChange={handleChange} className="w-full border p-2 rounded" />

//       <label>Email</label>
//       <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />

//       <label>Phone</label>
//       <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />

//       <label>Address</label>
//       <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
//     </form>
//   );
// }


// // Define path for new form page
// // form_page_path = os.path.join(app_path, "seafarer-application")
// // os.makedirs(form_page_path, exist_ok=True)

// // // Write form code to page.jsx
// // with open(os.path.join(form_page_path, "page.jsx"), "w") as f:
// //     f.write(form_page_code)

'use client';

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

export default function SeafarerApplicationForm() {
  const [formData, setFormData] = useState({
    company: "",
    formType: "",
    fullName: "",
    dob: "",
    pob: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    rank: "",
    passportNo: "",
    passportIssue: "",
    passportExpiry: "",
    seamanBookNo: "",
    sidNo: "",
    usVisaType: "",
    height: "",
    weight: "",
    shoeSize: "",
    education: "",
    license: "",
    licenseIssue: "",
    licenseExpiry: "",
    nextOfKin: "",
    family: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send POST request to backend API
    const res = await fetch("/api/application/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    alert(data.message || "Submitted");
  };

  return (
    // <h1 className="text-4xl text-green-600 underline font-bold">Tailwind is working!</h1>

    <form onSubmit={handleSubmit} className="grid gap-4 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Seafarer Application Form</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Each label + input block */}
        <div>
          <Label>Company</Label>
          <Select name="company" onValueChange={(value) => setFormData({ ...formData, company: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DD">DD</SelectItem>
              <SelectItem value="KN">KN</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
        
        <div>
          <Select name="formType" onValueChange={(value) => setFormData({ ...formData, formType: value })}>
            <Label>Form Type</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select form type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="officer">Officer</SelectItem>
              <SelectItem value="crew">Crew</SelectItem>
            </SelectContent>
          </Select>
        </div>
           

        <div>
          <Label>Full Name</Label>
          <Input name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>

        <div>
          <Label>Place of Birth</Label>
          <Input name="pob" value={formData.pob} onChange={handleChange} />
        </div>

        <div>
          <Label>Email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <Label>Phone</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div>
          <Label>Address</Label>
          <Textarea name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div>
          <Label>Rank</Label>
          <Input name="rank" value={formData.rank} onChange={handleChange} />
        </div>

        <div>
          <Label>Passport Number</Label>
          <Input name="passportNo" value={formData.passportNo} onChange={handleChange} />
        </div>

        <div>
          <Label>Passport Issued Date</Label>
        <Input type="date" name="passportIssue" value={formData.passportIssue} onChange={handleChange} />
        </div>

        <div>
          <Label>Passport Expiry Date</Label>
          <Input type="date" name="passportExpiry" value={formData.passportExpiry} onChange={handleChange} />
        </div>

        <div>
          <Label>Height (cm)</Label>
          <Input name="height" value={formData.height} onChange={handleChange} />
        </div>

        <div>
          <Label>Weight (kg)</Label>
          <Input name="weight" value={formData.weight} onChange={handleChange} />
        </div>

        <div>
          <Label>Shoe Size</Label>
          <Input name="shoeSize" value={formData.shoeSize} onChange={handleChange} />
        </div>

        <div>
          <Label>Education</Label>
          <Input name="education" value={formData.education} onChange={handleChange} />
        </div>

        <div>
          <Label>Seaman Book Number</Label>
          <Input name="seamanBookNo" value={formData.seamanBookNo} onChange={handleChange} />
        </div>
      
        <div>
          <Label>License Type</Label>
          <Input name="license" value={formData.license} onChange={handleChange} />
        </div>
      
        <div>
          <Label>License Issued</Label>
          <Input type="date" name="licenseIssue" value={formData.licenseIssue} onChange={handleChange} />
        </div>

        <div>
          <Label>License Expiry</Label>
          <Input type="date" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleChange} />
        </div>

        <div>
          <Label>Next of Kin</Label>
          <Input name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} />
        </div>

        <div>
          <Label>Family Info</Label>
          <Textarea name="family" value={formData.family} onChange={handleChange} />
        </div> 

        <div className="col-span-2">
          <Button type="submit">Submit Application</Button>
        </div>
      </div>
    </form>
  );
}
