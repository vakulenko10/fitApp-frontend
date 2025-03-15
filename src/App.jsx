import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import Header from "./components/Header";
import { RenderRoutes } from "./components/navigation/RenderRoutes";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import { ScrollArea } from "./components/ui/scroll-area";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

function App() {
  const handleClick = (data) => {
    toast(data.title, {
      description: data.description,
      action: data.action, // Optional: Custom action button
      duration: data.duration || 5000, // Default duration 5s
      className: 'visible'
    });
  };

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Header />
        <div className="container">
          <RenderRoutes />
          <Button variant={"accent"}>accent variant btn</Button>
          <Button>default variant btn</Button>
          <Button variant={"accentNegative"}>
            accent negative variant btn
          </Button>
          <Button variant={"destructive"}>destructive variant btn</Button>
          <Button variant={"submit"}>submit variant btn</Button>

          <div className="grid grid-cols-2 gap-10">
            <div className="text-foreground bg-background">
              bg-background text-foreground
            </div>
            <div className="text-card-foreground bg-card">
              bg-card text-card-foreground
            </div>
            <div className="text-popover-foreground bg-popover">
              bg-popover text-popover-foreground
            </div>
            <div className="text-primary-foreground bg-primary">
              bg-primary text-primary-foreground
            </div>
            <div className="text-secondary-foreground bg-secondary">
              bg-secondary text-secondary-foreground
            </div>
            <div className="text-tertiary-foreground bg-tertiary">
              bg-tertiary text-tertiary-foreground
            </div>
            <div className="text-muted-foreground bg-muted">
              bg-muted text-muted-foreground
            </div>
            <div className="text-accent-foreground bg-accent">
              bg-accent text-accent-foreground
            </div>
            <div className="text-accent-negative-foreground bg-accent-negative">
              bg-accent-negative text-accent-negative-foreground
            </div>
            <div className="text-destructive-foreground bg-destructive">
              bg-destructive text-destructive-foreground
            </div>
            {/* <div className="text-border bg-border">bg-border text-border</div>
          <div className="text-input bg-input">bg-input text-input</div>
          <div className="text-ring bg-ring">bg-ring text-ring</div>
          <div className="text-chart-1 bg-chart-1">bg-chart-1 text-chart-1</div>
          <div className="text-chart-2 bg-chart-2">bg-chart-2 text-chart-2</div>
          <div className="text-chart-3 bg-chart-3">bg-chart-3 text-chart-3</div>
          <div className="text-chart-4 bg-chart-4">bg-chart-4 text-chart-4</div>
          <div className="text-chart-5 bg-chart-5">bg-chart-5 text-chart-5</div>
          <div className="text-sidebar-foreground bg-sidebar">bg-sidebar text-sidebar-foreground</div>
          <div className="text-sidebar-primary-foreground bg-sidebar-primary">bg-sidebar-primary text-sidebar-primary-foreground</div>
          <div className="text-sidebar-accent-foreground bg-sidebar-accent">bg-sidebar-accent text-sidebar-accent-foreground</div>
          <div className="text-sidebar-border bg-sidebar-border">bg-sidebar-border text-sidebar-border</div>
          <div className="text-sidebar-ring bg-sidebar-ring">bg-sidebar-ring text-sidebar-ring</div> */}
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="bg-button text-white rounded-xl px-5 py-1">
              Open alert dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="bg-primary p-10">
            <Textarea placeholder="text area" />

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Input />
            <Drawer>
              <DrawerTrigger>
                <Button variant="submit">Open drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button variant="submit">Submit</Button>
                    <DrawerClose>
                      <Button
                        variant="outline"
                        className={"text-secondary hover:text-secondary/80"}
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Button
              onClick={() =>
                handleClick({
                  title: "Success",
                  description: "Your changes have been saved!",
                  action: {
                    label:<div className="!bg-transparent !p-0 !m-0">
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                      Retry
                    </button>
                  </div>,
                    onClick: () => console.log("Undo clicked")
                  },
                  duration: 3000, // Display for 3 seconds
                  className: "!bg-white !shadow-lg !p-4 !rounded-lg",
                })
              }
            >
              Show Success Toast
            </Button>

            
          </div>
        </div>
        <Toaster />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
