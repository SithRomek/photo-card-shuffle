
import React, { useState } from 'react';
import { Upload, Trash2, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface AdminSettingsProps {
  photos: Photo[];
  onPhotosUpdate: (photos: Photo[]) => void;
}

const AdminSettings = ({ photos, onPhotosUpdate }: AdminSettingsProps) => {
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const handleAddPhoto = () => {
    const newPhoto: Photo = {
      id: `photo-${Date.now()}`,
      url: `photo-${Math.floor(Math.random() * 1000000000000)}`, // Random placeholder
      title: 'New Photo',
      description: 'Click edit to update this photo'
    };
    
    onPhotosUpdate([...photos, newPhoto]);
    toast({
      title: "Photo Added",
      description: "New photo has been added to your gallery.",
    });
  };

  const handleDeletePhoto = (photoId: string) => {
    onPhotosUpdate(photos.filter(photo => photo.id !== photoId));
    toast({
      title: "Photo Deleted",
      description: "Photo has been removed from your gallery.",
    });
  };

  const handleEditPhoto = (photo: Photo) => {
    setEditingPhoto(photo.id);
    setEditForm({ title: photo.title, description: photo.description || '' });
  };

  const handleSaveEdit = (photoId: string) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === photoId
        ? { ...photo, title: editForm.title, description: editForm.description }
        : photo
    );
    onPhotosUpdate(updatedPhotos);
    setEditingPhoto(null);
    toast({
      title: "Photo Updated",
      description: "Photo details have been saved successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditingPhoto(null);
    setEditForm({ title: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Photo Gallery Admin</h1>
            <p className="text-muted-foreground">
              Manage your photo collection with ease. Add, edit, or remove photos from your gallery.
            </p>
          </div>

          {/* Add Photo Button */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Add New Photo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAddPhoto} className="w-full sm:w-auto">
                <Upload className="w-4 h-4 mr-2" />
                Add Photo (Placeholder)
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                In a real application, this would open a file picker to upload images.
              </p>
            </CardContent>
          </Card>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={`https://images.unsplash.com/${photo.url}?w=400&h=400&fit=crop`}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  {editingPhoto === photo.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Photo title"
                      />
                      <Textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Photo description"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleSaveEdit(photo.id)}
                          size="sm"
                          className="flex-1"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold mb-1">{photo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {photo.description || 'No description'}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEditPhoto(photo)}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeletePhoto(photo.id)}
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {photos.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No photos yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your gallery by adding your first photo.
                </p>
                <Button onClick={handleAddPhoto}>
                  <Upload className="w-4 h-4 mr-2" />
                  Add Your First Photo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
