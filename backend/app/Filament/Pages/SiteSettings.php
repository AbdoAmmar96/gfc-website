<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Configuration';
    protected static ?int $navigationSort = 100;
    protected static string $view = 'filament.pages.site-settings';
    protected static ?string $title = 'Site Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = Setting::instance();
        $this->form->fill($settings->toArray());
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Tabs::make('Settings')->tabs([
                Forms\Components\Tabs\Tab::make('Branding')->schema([
                    Forms\Components\FileUpload::make('logo')->image()->directory('branding')->maxSize(1024),
                    Forms\Components\FileUpload::make('logo_dark')->image()->directory('branding')->maxSize(1024),
                    Forms\Components\FileUpload::make('favicon')->image()->directory('branding')->maxSize(256),
                    Forms\Components\TextInput::make('site_name.en')->label('Site name (EN)')->required(),
                    Forms\Components\TextInput::make('site_name.ar')->label('اسم الموقع (AR)')->required()->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\TextInput::make('site_tagline.en')->label('Tagline (EN)'),
                    Forms\Components\TextInput::make('site_tagline.ar')->label('الشعار النصي (AR)')->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

                Forms\Components\Tabs\Tab::make('Hero')->schema([
                    Forms\Components\FileUpload::make('hero_image')->image()->directory('branding')->maxSize(3072),
                    Forms\Components\TextInput::make('hero_title.en')->label('Hero title (EN)'),
                    Forms\Components\TextInput::make('hero_title.ar')->label('عنوان الهيرو (AR)')->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\Textarea::make('hero_subtitle.en')->label('Hero subtitle (EN)')->rows(2),
                    Forms\Components\Textarea::make('hero_subtitle.ar')->label('وصف الهيرو (AR)')->rows(2)->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\TextInput::make('hero_cta_text.en')->label('CTA text (EN)'),
                    Forms\Components\TextInput::make('hero_cta_text.ar')->label('نص الزر (AR)')->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

                Forms\Components\Tabs\Tab::make('About')->schema([
                    Forms\Components\Textarea::make('about_short.en')->label('About short (EN)')->rows(4),
                    Forms\Components\Textarea::make('about_short.ar')->label('نبذة (AR)')->rows(4)->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

                Forms\Components\Tabs\Tab::make('Contact')->schema([
                    Forms\Components\TextInput::make('phone_primary')->tel(),
                    Forms\Components\TextInput::make('phone_secondary')->tel(),
                    Forms\Components\TextInput::make('email_primary')->email(),
                    Forms\Components\TextInput::make('email_support')->email(),
                    Forms\Components\TextInput::make('whatsapp')->tel(),
                    Forms\Components\TextInput::make('address_line.en')->label('Address (EN)'),
                    Forms\Components\TextInput::make('address_line.ar')->label('العنوان (AR)')->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\Textarea::make('working_hours.en')->label('Working hours (EN)')->rows(2),
                    Forms\Components\Textarea::make('working_hours.ar')->label('ساعات العمل (AR)')->rows(2)->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\Textarea::make('google_maps_embed')->label('Google Maps embed src URL')->rows(2),
                ])->columns(2),

                Forms\Components\Tabs\Tab::make('Social')->schema([
                    Forms\Components\TextInput::make('facebook')->url()->prefix('https://'),
                    Forms\Components\TextInput::make('linkedin')->url()->prefix('https://'),
                    Forms\Components\TextInput::make('instagram')->url()->prefix('https://'),
                    Forms\Components\TextInput::make('twitter')->url()->prefix('https://'),
                    Forms\Components\TextInput::make('youtube')->url()->prefix('https://'),
                ])->columns(2),
            ])->persistTabInQueryString(),
        ])->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();
        Setting::instance()->update($data);

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Save settings')
                ->submit('save'),
        ];
    }
}
