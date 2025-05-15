import { Avatar, AvatarFallback, AvatarImage } from "@edgepress/ui/components/avatar";
import { Button } from "@edgepress/ui/components/button";
import { Calendar, Mail, MapPin, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-background">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage alt="John Doe" src="" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button>Change Photo</Button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Full Name
                </label>
                <div className="flex border rounded-md">
                  <div className="px-3 py-2 bg-muted border-r">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="name"
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    value="John Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="flex border rounded-md">
                  <div className="px-3 py-2 bg-muted border-r">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    value="john.doe@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="location">
                  Location
                </label>
                <div className="flex border rounded-md">
                  <div className="px-3 py-2 bg-muted border-r">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="location"
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    value="San Francisco, CA"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="joined">
                  Joined
                </label>
                <div className="flex border rounded-md">
                  <div className="px-3 py-2 bg-muted border-r">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    id="joined"
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    disabled
                    value="January 2023"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                className="w-full min-h-[100px] p-3 border rounded-md bg-transparent focus:outline-none resize-none"
                defaultValue="Content creator and technology enthusiast. I write about web development, programming, and tech industry trends."
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
