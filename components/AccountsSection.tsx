import type React from "react"

const mockAccounts = [
  {
    id: 1,
    title: "حساب كونكر مميز - سيزن 25",
    price: 450,
    images: [
      "/placeholder.svg?height=300&width=400&text=PUBG+Account+1",
      "/placeholder.svg?height=300&width=400&text=PUBG+Account+2",
    ],
    details: {
      rank: "كونكر",
      level: "85",
      kd: "3.2",
      matches: "1250",
      wins: "320",
      uc: "15000",
      // Add more details as needed
    },
  },
  // Add more mock accounts with proper structure
]

const AccountsSection: React.FC = () => {
  return (
    <div>
      {/* Implement your accounts section here using mockAccounts data */}
      <h2>Accounts Section</h2>
      {mockAccounts.map((account) => (
        <div key={account.id}>
          <h3>{account.title}</h3>
          <p>Price: {account.price}</p>
          {account.images.map((image, index) => (
            <img key={index} src={image || "/placeholder.svg"} alt={`Account ${account.id} - Image ${index + 1}`} />
          ))}
          <p>Rank: {account.details.rank}</p>
          <p>Level: {account.details.level}</p>
          {/* Display other account details */}
        </div>
      ))}
    </div>
  )
}

export default AccountsSection
