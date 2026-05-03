<?php
namespace App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Filament\Resources\ContactSubmissionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
class EditContactSubmission extends EditRecord {
    protected static string $resource = ContactSubmissionResource::class;
    protected function getHeaderActions(): array { return [Actions\DeleteAction::make()]; }
    protected function mutateFormDataBeforeSave(array $data): array {
        $data['is_read'] = true;
        return $data;
    }
}
