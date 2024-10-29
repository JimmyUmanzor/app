import ActiveCard from "@/app/Components/ActiveCard"

export default function page() {
  
  const textCard=[
    {Header:"Noteworthy technology acquisitions 2021"},
    {Body:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order"}
    ]

return (
<div>
          {
                 textCard.map((text, index) => (
                  <ActiveCard key={index} Header={text.Header} Body={text.Body}></ActiveCard>
                ))
            }

      </div>
)
}


